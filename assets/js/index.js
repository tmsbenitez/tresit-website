// HEADER WHITE

window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("abajo", window.scrollY > 50);
});

// MENU DESPLEGABLE

const menu = document.querySelector(".menu");
const openMenuBtn = document.querySelector(".open-menu");
const closeMenuBtn = document.querySelector(".close-menu");

function toggleMenu() {
  menu.classList.toggle("menu_opened");
}

openMenuBtn.addEventListener("click", toggleMenu);
closeMenuBtn.addEventListener("click", toggleMenu);

const menuLinks = document.querySelectorAll(".menu");

menuLinks.forEach((menuLink) => {
  menuLink.addEventListener("click", function () {
    menuLink.classList.remove("menu_opened");
  });
});

// INTERSECTION OBSERVER

const options = {
  threshold: 0.6,
};

const addActiveClass = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
      let currentActive = document.querySelector(".leftmenu a.active");

      if (currentActive) {
        currentActive.classList.remove("active");
      }

      let newActive = document.querySelector(
        `.leftmenu a[href="#${entry.target.getAttribute("id")}"]`
      );

      newActive.classList.add("active");
    }
  });
};

const observer = new IntersectionObserver(addActiveClass, options);

const sections = document.querySelectorAll("section");

sections.forEach((section) => {
  observer.observe(section);
});
