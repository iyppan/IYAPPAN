$ErrorActionPreference = "Stop"
$siteRoot = (Resolve-Path -LiteralPath $PSScriptRoot).Path
$rootPrefix = $siteRoot.TrimEnd('\') + '\'
$prefix = "http://127.0.0.1:8765/"
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
} catch {
    Write-Host "Could not start the local preview at $prefix" -ForegroundColor Red
    Write-Host $_.Exception.Message
    Read-Host "Press Enter to close"
    exit 1
}

Write-Host "Iyappan's portfolio is open at $prefix" -ForegroundColor Cyan
Write-Host "Keep this window open while previewing. Press Ctrl+C to stop the preview."
Start-Process $prefix

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        try {
            $relativePath = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart('/'))
            if ([string]::IsNullOrWhiteSpace($relativePath)) {
                $relativePath = "index.html"
            }

            $filePath = [System.IO.Path]::GetFullPath((Join-Path -Path $siteRoot -ChildPath $relativePath))
            if (-not $filePath.StartsWith($rootPrefix, [System.StringComparison]::OrdinalIgnoreCase) -or -not (Test-Path -LiteralPath $filePath -PathType Leaf)) {
                $context.Response.StatusCode = 404
                $context.Response.ContentType = "text/plain; charset=utf-8"
                $body = [System.Text.Encoding]::UTF8.GetBytes("Not found")
                $context.Response.ContentLength64 = $body.Length
                if ($context.Request.HttpMethod -ne "HEAD") {
                    $context.Response.OutputStream.Write($body, 0, $body.Length)
                }
                continue
            }

            $contentType = switch ([System.IO.Path]::GetExtension($filePath).ToLowerInvariant()) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "text/javascript; charset=utf-8" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".png"  { "image/png" }
                ".svg"  { "image/svg+xml" }
                ".ico"  { "image/x-icon" }
                default { "application/octet-stream" }
            }

            $body = [System.IO.File]::ReadAllBytes($filePath)
            $context.Response.StatusCode = 200
            $context.Response.ContentType = $contentType
            $context.Response.Headers["Cache-Control"] = "no-cache"
            $context.Response.ContentLength64 = $body.Length
            if ($context.Request.HttpMethod -ne "HEAD") {
                $context.Response.OutputStream.Write($body, 0, $body.Length)
            }
        } catch {
            Write-Host $_.Exception.Message -ForegroundColor Yellow
            try {
                $context.Response.StatusCode = 500
            } catch { }
        } finally {
            $context.Response.Close()
        }
    }
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
    $listener.Close()
}
