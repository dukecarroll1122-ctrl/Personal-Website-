document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
  const backToTop = document.getElementById("backToTop");
  const revealTargets = Array.from(document.querySelectorAll(".reveal"));

  const setActiveNav = () => {
    const scrollY = window.scrollY + 140;
    let activeId = sections[0]?.id ?? "";

    for (const section of sections) {
      if (scrollY >= section.offsetTop) activeId = section.id;
    }

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${activeId}`;
      link.classList.toggle("active", isActive);
    });
  };

  const toggleBackToTop = () => {
    if (!backToTop) return;
    backToTop.classList.toggle("show", window.scrollY > 320);
  };

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));

  window.addEventListener("scroll", () => {
    setActiveNav();
    toggleBackToTop();
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  setActiveNav();
  toggleBackToTop();
});
