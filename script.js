const prices = {
  monthly: { ping250: "0.17", ping500: "0.30", ping1000: "0.55", label: "per month" },
  quarterly: { ping250: "0.45", ping500: "0.80", ping1000: "1.45", label: "per 3 months" },
  yearly: { ping250: "1.05", ping500: "1.90", ping1000: "3.40", label: "per year" },
};

document.querySelectorAll(".billing-option").forEach((option) => {
  option.addEventListener("click", () => {
    const period = option.dataset.period;
    document.querySelectorAll(".billing-option").forEach((item) => {
      const selected = item === option;
      item.classList.toggle("selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    Object.entries(prices[period]).forEach(([key, value]) => {
      if (key === "label") {
        document.querySelectorAll("[data-period-label]").forEach((label) => {
          label.textContent = value;
        });
      } else {
        const price = document.querySelector(`[data-price="${key}"]`);
        if (price) price.textContent = value;
      }
    });
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuToggle?.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  menuToggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
  mainNav?.classList.toggle("open", !expanded);
});
mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.querySelectorAll(".faq-list details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      document.querySelectorAll(".faq-list details").forEach((other) => {
        if (other !== item) other.open = false;
      });
    }
  });
});

