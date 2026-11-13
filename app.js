(function () {
  const data = window.PORTFOLIO;
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

  document.documentElement.classList.add("js");
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
})();
