const laserCanvas = document.querySelector("#laser-flow");
if (laserCanvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const context = laserCanvas.getContext("2d");
  const stage = laserCanvas.parentElement;
  let width = 0, height = 0, frame = 0;
  const dust = Array.from({ length: 42 }, (_, index) => ({
    x: ((index * 67) % 101) / 101,
    y: ((index * 37) % 97) / 97,
    r: 0.5 + (index % 3) * 0.35,
    phase: index * 1.7
  }));
  const resizeLaser = () => {
    const box = stage.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = box.width; height = box.height;
    laserCanvas.width = Math.round(width * dpr);
    laserCanvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const drawLaser = (time) => {
    context.clearRect(0, 0, width, height);
    const t = time * 0.00022;
    const beamX = width * (0.4 + Math.sin(t) * 0.16);
    const beam = context.createLinearGradient(beamX - 110, height * .3, beamX + 110, height * .75);
    beam.addColorStop(0, "rgba(168,158,199,0)");
    beam.addColorStop(.48, "rgba(168,158,199,.09)");
    beam.addColorStop(.5, "rgba(203,194,225,.27)");
    beam.addColorStop(.53, "rgba(168,158,199,.09)");
    beam.addColorStop(1, "rgba(168,158,199,0)");
    context.save();
    context.translate(beamX, height * .53);
    context.rotate(-.39);
    context.fillStyle = beam;
    context.fillRect(-width * .75, -15, width * 1.5, 30);
    context.restore();
    dust.forEach((dot) => {
      const alpha = .12 + (Math.sin(time * .0006 + dot.phase) + 1) * .1;
      context.beginPath();
      context.arc(dot.x * width, dot.y * height, dot.r, 0, Math.PI * 2);
      context.fillStyle = `rgba(203,198,218,${alpha})`;
      context.fill();
    });
    frame = requestAnimationFrame(drawLaser);
  };
  resizeLaser();
  window.addEventListener("resize", resizeLaser, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(frame);
    else frame = requestAnimationFrame(drawLaser);
  });
  frame = requestAnimationFrame(drawLaser);
}

const introScreen = document.querySelector("#intro-screen");
if (introScreen) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let introSeen = false;
  try {
    introSeen = sessionStorage.getItem("pingwallet-intro-seen") === "1";
    if (!introSeen) sessionStorage.setItem("pingwallet-intro-seen", "1");
  } catch {
    // If storage is unavailable, keep the one-time reveal for this page load.
  }

  if (introSeen || reducedMotion) {
    introScreen.classList.add("is-skipped");
    introScreen.setAttribute("aria-hidden", "true");
  } else {
    window.setTimeout(() => {
      introScreen.setAttribute("aria-hidden", "true");
      window.setTimeout(() => introScreen.classList.add("is-finished"), 850);
    }, 2960);
  }
}

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

