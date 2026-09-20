(function () {
  const $ = (sel, root = document) => root.querySelector(sel);

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const pad = (n) => String(n).padStart(2, "0");

  const artMarkup = (project) => {
    if (project.art === "ml") {
      return `<div class="project-art art-ml"><div class="chart"><b>R²</b><strong>MODEL</strong><i></i><i></i><i></i><i></i></div></div>`;
    }
    if (project.art === "java") {
      return `<div class="project-art art-java"><span>{ }</span></div>`;
    }
    if (project.art === "mern") {
      return `<div class="project-art art-mern"><span>API</span><small>JWT · REST</small></div>`;
    }
    return `<div class="project-art art-data"><span>DATA</span><div class="dots">••••••</div></div>`;
  };

  const projectCard = (project, index) => {
    const link = project.github
      ? `<a class="project-link" href="${escapeHtml(project.github)}" target="_blank" rel="noopener">View on GitHub ↗</a>`
      : "";
    return `
      <article class="project reveal ${project.featured ? "featured" : ""}" data-id="${escapeHtml(project.id)}" data-category="${escapeHtml(project.category)}" data-tags="${escapeHtml(project.tags.join(" ").toLowerCase())}">
        <div class="project-index">${pad(index + 1)}</div>
        <div class="project-content">
          <div class="tags">${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
          <h3>${escapeHtml(project.title).split("\n").join("<br>")}</h3>
          <p>${escapeHtml(project.summary)}</p>
          <div class="project-actions">
            ${link}
            <button class="project-link details-btn" type="button" data-open="${escapeHtml(project.id)}">View details ↗</button>
          </div>
        </div>
        ${artMarkup(project)}
      </article>
    `;
  };

  function renderNav() {
    $("#site-nav").innerHTML = PORTFOLIO.nav
      .map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
      .join("");
    $(".brand").innerHTML = `${escapeHtml(PORTFOLIO.brand)}<span>.</span>`;
  }

  function renderHero() {
    const [before, after] = PORTFOLIO.tagline.split(PORTFOLIO.headlineAccent);
    const stats = PORTFOLIO.stats.map((stat) =>
      stat.label === "Projects"
        ? { ...stat, value: `${PORTFOLIO.projects.length}+` }
        : stat
    );
    $("#hero-copy").innerHTML = `
      <p class="eyebrow">${escapeHtml(PORTFOLIO.title)}</p>
      <h1>${escapeHtml(before.trim())} <span>${escapeHtml(PORTFOLIO.headlineAccent)}</span><br>${escapeHtml(after.trim())}</h1>
      <p class="lead">I'm <strong>${escapeHtml(PORTFOLIO.name)}</strong>, ${escapeHtml(PORTFOLIO.summary)}</p>
      <div class="hero-actions">
        <a class="btn primary" href="#projects">Explore my work <span>↗</span></a>
        <a class="btn ghost" href="mailto:${escapeHtml(PORTFOLIO.email)}">Let's connect</a>
      </div>
      <div class="quick-stats">
        ${stats
          .map(
            (stat) =>
              `<div><strong data-stat>${escapeHtml(stat.value)}</strong><small>${escapeHtml(stat.label)}</small></div>`
          )
          .join("")}
      </div>
    `;
    $("#hero-card").innerHTML = `
      <div class="profile-ring"><div class="profile-initials">${escapeHtml(PORTFOLIO.shortName)}</div></div>
      <div class="card-label">CURRENTLY</div>
      <h3>${escapeHtml(PORTFOLIO.currently.status)}</h3>
      <p>${escapeHtml(PORTFOLIO.currently.stack)}</p>
      <div class="mini-bars"><i></i><i></i><i></i><i></i><i></i></div>
    `;
    $("#hero-copy").classList.add("visible");
    $("#hero-card").classList.add("visible");
  }

  function renderAbout() {
    const about = PORTFOLIO.about;
    $("#about").innerHTML = `
      <div class="section-kicker">${escapeHtml(about.kicker)}</div>
      <div class="two-col">
        <h2>${escapeHtml(about.heading)}<br><em>${escapeHtml(about.emphasis)}</em></h2>
        <div>
          ${about.paragraphs.map((p) => `<p class="section-text">${escapeHtml(p)}</p>`).join("")}
        </div>
      </div>
    `;
  }

  function renderSkills() {
    $("#skills").innerHTML = `
      <div class="section-kicker">02 / TOOLKIT</div>
      <h2>Tools I work with.</h2>
      <div class="skill-grid">
        ${PORTFOLIO.skills
          .map(
            (skill, i) => `
          <article>
            <span class="num">${pad(i + 1)}</span>
            <h3>${escapeHtml(skill.name)}</h3>
            <p>${escapeHtml(skill.items)}</p>
          </article>
        `
          )
          .join("")}
      </div>
    `;
  }

  function categories() {
    return ["All", ...new Set(PORTFOLIO.projects.map((p) => p.category))];
  }

  function renderProjects(filter = "All") {
    const visible = PORTFOLIO.projects.filter(
      (p) => filter === "All" || p.category === filter
    );
    const empty =
      visible.length === 0
        ? `<p class="empty-state">No projects in this category yet.</p>`
        : "";

    $("#projects").innerHTML = `
      <div class="section-kicker">03 / SELECTED WORK</div>
      <div class="projects-head">
        <h2>Things I've built.</h2>
        <p>${escapeHtml(PORTFOLIO.projectsIntro)}</p>
      </div>
      <div class="project-controls">
        <div class="filters" role="tablist" aria-label="Filter projects">
          ${categories()
            .map(
              (cat) =>
                `<button class="filter-btn ${cat === filter ? "active" : ""}" type="button" data-filter="${escapeHtml(cat)}" role="tab" aria-selected="${cat === filter}">${escapeHtml(cat)}</button>`
            )
            .join("")}
        </div>
        <label class="project-search">
          <span class="sr-only">Search projects</span>
          <input id="project-search" type="search" placeholder="Search projects…" autocomplete="off">
        </label>
      </div>
      <div id="project-list">
        ${visible.map((project, i) => projectCard(project, i)).join("")}
        ${empty}
      </div>
    `;
    observeReveals();
  }

  function renderEducation() {
    $("#education").innerHTML = `
      <div class="section-kicker">04 / EDUCATION</div>
      <h2>The foundation.</h2>
      <div class="timeline">
        ${PORTFOLIO.education
          .map(
            (item) => `
          <div class="edu-item">
            <span>${escapeHtml(item.years)}</span>
            <div>
              <h3>${escapeHtml(item.degree)}</h3>
              <p>${escapeHtml(item.school)}</p>
            </div>
            <strong>${escapeHtml(item.score)}</strong>
          </div>
        `
          )
          .join("")}
      </div>
      <div class="certs">
        <h3>Certifications</h3>
        <div class="cert-list">
          ${PORTFOLIO.certifications.map((c) => `<span>${escapeHtml(c)}</span>`).join("")}
        </div>
      </div>
    `;
  }

  function renderContact() {
    $("#contact").innerHTML = `
      <div class="contact-inner reveal">
        <p class="eyebrow">05 / LET'S TALK</p>
        <h2>Have an idea?<br><span>Let's build it.</span></h2>
        <p>Open to learning, collaborating, and building meaningful software.</p>
        <a class="contact-email" href="mailto:${escapeHtml(PORTFOLIO.email)}">${escapeHtml(PORTFOLIO.email)} <span>↗</span></a>
        <form class="contact-form" id="contact-form" novalidate>
          <div class="form-row">
            <label>
              Name
              <input name="name" type="text" required maxlength="80" placeholder="Your name">
            </label>
            <label>
              Email
              <input name="email" type="email" required maxlength="120" placeholder="you@example.com">
            </label>
          </div>
          <label>
            Message
            <textarea name="message" required maxlength="1000" rows="5" placeholder="Tell me about the idea, internship, or project."></textarea>
          </label>
          <p class="form-error" id="form-error" hidden></p>
          <button class="btn primary" type="submit">Send message</button>
        </form>
        <div class="socials">
          ${PORTFOLIO.socials
            .map(
              (s) =>
                `<a href="${escapeHtml(s.href)}" target="_blank" rel="noopener">${escapeHtml(s.label)}</a>`
            )
            .join("")}
          <span>${escapeHtml(PORTFOLIO.location)}</span>
        </div>
      </div>
    `;
  }

  function renderFooter() {
    $("#site-footer").innerHTML = `
      <span>© <span id="year">${new Date().getFullYear()}</span> ${escapeHtml(PORTFOLIO.name)}</span>
      <span>Designed & built with code.</span>
    `;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "40px 0px" }
  );

  function observeReveals() {
    document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("visible");
        return;
      }
      revealObserver.observe(el);
    });
  }

  function bindNav() {
    const menu = $(".menu");
    const nav = $("#site-nav");
    menu?.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
      }
    });

    const sections = ["home", "about", "skills", "projects", "education", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          nav.querySelectorAll("a").forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
          });
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => spy.observe(section));
  }

  function bindTheme() {
    const root = document.documentElement;
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) root.setAttribute("data-theme", saved);
    $(".theme-toggle").addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem("portfolio-theme", next);
    });
  }

  function bindScrollProgress() {
    const bar = $("#scroll-progress");
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function bindProjects() {
    const section = $("#projects");
    const dialog = $("#project-dialog");
    const body = $("#dialog-body");

    section.addEventListener("click", (e) => {
      const filterBtn = e.target.closest("[data-filter]");
      if (filterBtn) {
        renderProjects(filterBtn.dataset.filter);
        return;
      }
      const openBtn = e.target.closest("[data-open]");
      if (openBtn) {
        const project = PORTFOLIO.projects.find((p) => p.id === openBtn.dataset.open);
        if (!project) return;
        body.innerHTML = `
          <p class="eyebrow">${escapeHtml(project.category)}</p>
          <h2 id="dialog-title">${escapeHtml(project.title)}</h2>
          <div class="tags">${project.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}</div>
          <p>${escapeHtml(project.summary)}</p>
          <ul class="highlights">${(project.highlights || []).map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul>
          ${
            project.github
              ? `<a class="btn primary" href="${escapeHtml(project.github)}" target="_blank" rel="noopener">Open GitHub ↗</a>`
              : ""
          }
        `;
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
      }
    });

    section.addEventListener("input", (e) => {
      if (e.target.id !== "project-search") return;
      const q = e.target.value.trim().toLowerCase();
      section.querySelectorAll(".project").forEach((card) => {
        const hay = `${card.dataset.tags} ${card.textContent}`.toLowerCase();
        card.hidden = q !== "" && !hay.includes(q);
      });
    });

    $(".dialog-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2800);
  }

  function bindContact() {
    $("#contact-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const error = $("#form-error");
      const data = Object.fromEntries(new FormData(form));
      const name = data.name.trim();
      const email = data.email.trim();
      const message = data.message.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !email || !message || !emailOk) {
        error.hidden = false;
        error.textContent = "Please enter a name, valid email, and message.";
        return;
      }

      error.hidden = true;
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
      window.location.href = `mailto:${PORTFOLIO.email}?subject=${subject}&body=${body}`;
      form.reset();
      showToast("Opening your email app to send the message.");
    });
  }

  function init() {
    document.title = `${PORTFOLIO.name} | Portfolio`;
    renderNav();
    renderHero();
    renderAbout();
    renderSkills();
    renderProjects();
    renderEducation();
    renderContact();
    renderFooter();
    observeReveals();
    bindNav();
    bindTheme();
    bindScrollProgress();
    bindProjects();
    bindContact();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
