const revealElements = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const typedText = document.getElementById("typed-text");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 90) {
      element.classList.add("active");
    }
  });
}

function setActiveNav() {
  let current = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

function toggleScrollTopBtn() {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
}

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const words = [
  "Frontend Web Developer",
  "Responsive UI Builder",
  "Creative Website Designer",
  "Future Software Engineer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typedText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    typedText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 90);
}

window.addEventListener("scroll", () => {
  revealOnScroll();
  setActiveNav();
  toggleScrollTopBtn();
});

window.addEventListener("load", () => {
  revealOnScroll();
  setActiveNav();
  toggleScrollTopBtn();
  typeEffect();
});