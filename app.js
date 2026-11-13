(function () {
  const data = window.PORTFOLIO;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");

  const splash = document.querySelector("#site-splash");
  if (splash) {
    document.body.classList.add("is-loading");
    document.querySelector("#main")?.setAttribute("aria-busy", "true");
    let splashClosed = false;
    const closeSplash = () => {
      if (splashClosed) return;
      splashClosed = true;
      splash.classList.add("is-done");
      document.body.classList.remove("is-loading");
      document.querySelector("#main")?.setAttribute("aria-busy", "false");
      window.setTimeout(() => splash.remove(), 600);
    };
    const showMinimumTime = () => window.setTimeout(closeSplash, reducedMotion ? 180 : 1200);
    if (document.readyState === "complete") showMinimumTime();
    else window.addEventListener("load", showMinimumTime, { once: true });
    window.setTimeout(closeSplash, reducedMotion ? 500 : 2200);
  }

  if (!data) return;

  const html = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));

  const about = document.querySelector("#about-copy");
  about.innerHTML = data.about.map((paragraph) => `<p>${html(paragraph)}</p>`).join("");

  document.querySelector("#skill-grid").innerHTML = data.skillGroups.map((group) => `
    <article class="skill-card reveal">
      <div class="skill-card-top"><span>${html(group.number)}</span><span class="skill-card-mark" aria-hidden="true">↗</span></div>
      <h3>${html(group.title)}</h3>
      <p>${html(group.description)}</p>
      <ul>${group.items.map((item) => `<li>${html(item)}</li>`).join("")}</ul>
    </article>
  `).join("");

  document.querySelector("#tool-ribbon").innerHTML = data.tools.map((tool) => `
    <span class="tool-chip"><span aria-hidden="true">✳</span>${html(tool)}</span>
  `).join("");

  document.querySelector("#project-grid").innerHTML = data.projects.map((project) => `
    <article class="project-card${project.featured ? " project-card-featured" : ""} reveal">
      <div class="project-image-wrap">
        <img src="${html(project.image)}" alt="${html(project.alt)}" loading="lazy">
        <span class="project-number">${html(project.number)} <i>/</i> 05</span>
        <span class="project-image-arrow" aria-hidden="true">↗</span>
      </div>
      <div class="project-info">
        <p class="project-type">${html(project.type)}</p>
        <h3>${html(project.title)}</h3>
        <p class="project-description">${html(project.description)}</p>
        <div class="project-tags">${project.tags.map((tag) => `<span>${html(tag)}</span>`).join("")}</div>
      </div>
    </article>
  `).join("");

  document.querySelector("#credits-strip").innerHTML = `
    <div class="credits-heading"><span class="credits-spark" aria-hidden="true">✳</span><div><p class="eyebrow">SELECTED PRODUCTION CREDITS</p><h3>Work that made<br>it to the screen.</h3></div></div>
    <div class="credits-list">${data.credits.map((credit, index) => `
      <div class="credit-row"><span class="credit-index">0${index + 1}</span><div><h4>${html(credit.title)}</h4><p>${html(credit.detail)}</p></div><span class="credit-studio">${html(credit.studio)}</span></div>
    `).join("")}</div>
  `;

  document.querySelector("#timeline").innerHTML = data.experience.map((item, index) => `
    <article class="timeline-item reveal"><div class="timeline-marker"><span>0${index + 1}</span></div>
      <div class="timeline-content"><p class="timeline-period">${html(item.period)}</p><h3>${html(item.role)}</h3><p class="timeline-place">${html(item.place)}</p><p class="timeline-description">${html(item.description)}</p></div>
    </article>
  `).join("");

  const school = data.education;
  document.querySelector("#education-card").innerHTML = `
    <div class="education-card-top"><span>EDUCATION</span><span class="education-icon" aria-hidden="true">✳</span></div>
    <p class="education-period">${html(school.period)}</p>
    <h3>${html(school.qualification)}</h3>
    <p class="education-school">${html(school.school)}</p>
    <span class="education-result">${html(school.result)}</span>
    <p class="education-detail">${html(school.detail)}</p>
  `;

  document.querySelector("#services-list").innerHTML = data.services.map((service, index) => `
    <article class="service-row reveal"><span class="service-index">0${index + 1}</span><h3>${html(service.title)}</h3><p>${html(service.description)}</p><span class="service-arrow" aria-hidden="true">↗</span></article>
  `).join("");

  const contact = data.contact;
  const emailLink = `mailto:${contact.email}`;
  document.querySelector("#contact-cta").href = emailLink;
  const showreel = contact.links.find((link) => link.label === "VFX Showreel");
  if (showreel) document.querySelector("#hero-showreel").href = showreel.url;
  if (window.location.protocol === "file:") {
    document.querySelector("#youtube-player").remove();
    document.querySelector("#youtube-local-fallback").hidden = false;
  }
  document.querySelector("#contact-details").innerHTML = `
    <a class="contact-email" href="${emailLink}">${html(contact.email)}</a>
    <div class="contact-meta"><span>${html(contact.location)}</span><a href="tel:${html(contact.phone.replace(/\s/g, ""))}">${html(contact.phone)}</a></div>
    <div class="contact-links">${contact.links.map((link) => `<a href="${html(link.url)}" target="_blank" rel="noreferrer">${html(link.label)} <span aria-hidden="true">↗</span></a>`).join("")}</div>
  `;

  document.querySelector("#year").textContent = new Date().getFullYear();

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  }));

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const cursor = document.querySelector("#custom-cursor");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (cursor && finePointer && !reducedMotion) {
    document.body.classList.add("cursor-active");
    window.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    }, { passive: true });
    document.addEventListener("pointerdown", () => document.body.classList.add("cursor-down"));
    document.addEventListener("pointerup", () => document.body.classList.remove("cursor-down"));
  }

  const soundToggle = document.querySelector("#sound-toggle");
  let soundEnabled = false;
  let audioContext;
  let lastHoverSound = 0;
  const playTone = (frequency, duration) => {
    if (!soundEnabled) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    audioContext ||= new AudioContextClass();
    if (audioContext.state === "suspended") audioContext.resume();
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.018, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.01);
  };

  if (soundToggle) {
    soundToggle.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      soundToggle.setAttribute("aria-pressed", String(soundEnabled));
      soundToggle.setAttribute("aria-label", soundEnabled ? "Turn interface sounds off" : "Turn interface sounds on");
      soundToggle.querySelector(".sound-label").textContent = soundEnabled ? "Sound on" : "Sound off";
      document.body.classList.toggle("sound-enabled", soundEnabled);
      if (soundEnabled) playTone(660, 0.09);
    });
  }

  const interactiveSelector = "a, button, .project-card";
  document.addEventListener("pointerover", (event) => {
    const target = event.target.closest?.(interactiveSelector);
    if (!target || target.contains(event.relatedTarget)) return;
    document.body.classList.add("cursor-hover");
    const now = performance.now();
    if (soundEnabled && now - lastHoverSound > 220) {
      lastHoverSound = now;
      playTone(760, 0.045);
    }
  });
  document.addEventListener("pointerout", (event) => {
    const target = event.target.closest?.(interactiveSelector);
    if (target && !target.contains(event.relatedTarget)) document.body.classList.remove("cursor-hover");
  });
  document.addEventListener("click", (event) => {
    if (event.target.closest?.("#sound-toggle")) return;
    if (event.target.closest?.(interactiveSelector)) playTone(520, 0.065);
  });
})();
