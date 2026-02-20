const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    navMenu.classList.toggle("is-open");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 1024) {
        navToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-open");
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (window.innerWidth >= 1024) return;
    if (!navMenu.classList.contains("is-open")) return;
    if (navMenu.contains(event.target) || navToggle.contains(event.target)) return;
    navToggle.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("is-open");
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-menu a").forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentPage) {
    link.classList.add("active");
  }
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const modal = document.getElementById("image-modal");
const modalImage = modal ? modal.querySelector(".modal-image") : null;
const modalClose = modal ? modal.querySelector(".modal-close") : null;
const modalTriggers = document.querySelectorAll(".modal-trigger");

if (modal && modalImage && modalClose && modalTriggers.length) {
  modalTriggers.forEach((image) => {
    image.addEventListener("click", () => {
      modalImage.src = image.src;
      modalImage.alt = image.alt;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Terima kasih. Pesan Anda berhasil dikirim.");
    contactForm.reset();
  });
}
