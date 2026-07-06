/* =====================================================================
   TA BI GOUA ANGE EMMANUEL — PORTFOLIO
   Interactions : interrupteur jour/nuit, menu mobile, animations au scroll
   ===================================================================== */

(function () {
  "use strict";

  /* ---------- Mode sombre / mode clair ---------- */
  /* Remarque : la préférence n'est volontairement pas sauvegardée dans le
     navigateur (pas de localStorage) afin de rester compatible avec
     l'aperçu Artifact de Claude. Si tu héberges ce site ailleurs (GitHub
     Pages, Netlify, etc.), tu peux ajouter une persistance avec
     localStorage.setItem('theme', ...) / getItem(...) sans problème. */

  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const rockerIcon = document.getElementById("rockerIcon");

  function applyTheme(theme) {
    body.setAttribute("data-theme", theme);
    themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    rockerIcon.className = theme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-bolt";
  }

  // Démarre selon la préférence système, sans la mémoriser ensuite.
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");

  themeToggle.addEventListener("click", function () {
    const next = body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
  });

  /* ---------- Menu mobile ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Révélation au scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Repli si IntersectionObserver n'est pas disponible.
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Petit effet d'entrée pour le hero (chargement de page) ---------- */
  window.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".hero .reveal").forEach(function (el, i) {
      setTimeout(function () { el.classList.add("in"); }, 120 + i * 110);
    });
  });
})();

    // On récupère les éléments
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgAgrandie");
    const images = document.querySelectorAll(".g-slot img");
    const closeBtn = document.querySelector(".close-btn");

    // On ajoute un événement "clic" sur chaque image de la galerie
    images.forEach(img => {
      img.addEventListener("click", function() {
        modal.style.display = "flex"; // Affiche le fond noir
        modalImg.src = this.src;      // Donne la bonne source à l'image agrandie
      });
    });

    // Fermer quand on clique sur la croix (X)
    closeBtn.addEventListener("click", function() {
      modal.style.display = "none";
    });

    // Fermer aussi quand on clique n'importe où sur le fond noir, autour de l'image
    modal.addEventListener("click", function(e) {
      if (e.target !== modalImg) {
        modal.style.display = "none";
      }
    });