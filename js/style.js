/* ============================================================
   Holy Resurrection Orthodox Church — Landing interactions
   ============================================================ */
(function () {
  "use strict";

  const nav = document.getElementById("mainNav");
  const toTop = document.getElementById("toTop");
  const heroBg = document.getElementById("heroBg");
  const navLinks = Array.from(document.querySelectorAll(".navbar .nav-link"));
  const sections = navLinks
    .map((l) => l.getAttribute("href"))
    .filter((h) => h && h.startsWith("#"))
    .map((h) => document.querySelector(h))
    .filter(Boolean);

  /* ---- Navbar background + back-to-top on scroll ---- */
  function onScroll() {
    const y = window.scrollY;

    if (y > 60) {
      nav.classList.add("scrolled");
      nav.classList.remove("at-top");
    } else {
      nav.classList.add("at-top");
      nav.classList.remove("scrolled");
    }

    toTop.classList.toggle("show", y > 500);

    // Subtle hero parallax
    if (heroBg && y < window.innerHeight) {
      heroBg.style.transform = `scale(1.08) translateY(${y * 0.18}px)`;
    }

    highlightActive();
  }

  /* ---- Active nav link based on section in view ---- */
  function highlightActive() {
    const pos = window.scrollY + 140;
    let current = sections[0];
    sections.forEach((sec) => {
      if (sec.offsetTop <= pos) current = sec;
    });
    if (!current) return;
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + current.id
      );
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Back to top ---- */
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---- Collapse mobile menu after clicking a link ---- */
  const collapseEl = document.getElementById("navMenu");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (collapseEl.classList.contains("show")) {
        const bs = bootstrap.Collapse.getInstance(collapseEl);
        if (bs) bs.hide();
      }
    });
  });

  /* ---- Scroll reveal animations ---- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el, i) => {
      // Stagger items within the same row group slightly.
      el.style.transitionDelay = (i % 4) * 90 + "ms";
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ---- Current year in footer ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Run once on load.
  onScroll();
})();
