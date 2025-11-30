console.log("JavaScript chargé ✅");

document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------
  // MENU MOBILE (Hamburger)
  // ------------------------------
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // ------------------------------
  // SOUS-MENUS
  // ------------------------------
  const submenuParents = document.querySelectorAll(".has-submenu > a");
  submenuParents.forEach(parent => {
    parent.addEventListener("click", e => {
      if (window.innerWidth <= 768) { // seulement sur mobile
        e.preventDefault();
        const submenu = parent.nextElementSibling;
        submenu.classList.toggle("active");
      }
    });
  });

  // Scroll vers section depuis sous-menu
  document.querySelectorAll('.submenu a').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href').replace('#', '');
      const targetBtn = document.getElementById(targetId);

      if (targetBtn) {
        e.preventDefault();
        targetBtn.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetBtn.click(); // active le contenu dynamique

        // Fermer menu mobile
        if (navLinks.classList.contains('active')) navLinks.classList.remove('active');
      }
    });
  });

  // ------------------------------
  // ACTIVATION SERVICES
  // ------------------------------
  const serviceButtons = document.querySelectorAll(".service-item");
  const serviceDetail = document.getElementById("serviceDetail");

  const servicesContent = {
    seo: {
      title: "Optimisation SEO",
      text: "J’analyse les performances de votre site, optimise la structure, le contenu et les balises pour améliorer votre visibilité sur les moteurs de recherche. L’objectif : attirer un trafic qualifié et durable."
    },
    content: {
      title: "Gestion de contenu web",
      text: "Je crée, organise et optimise votre contenu web pour qu’il soit pertinent, cohérent et engageant."
    },
    uxui: {
      title: "UX / UI Design",
      text: "Je conçois des interfaces intuitives et esthétiques pour offrir une expérience utilisateur fluide et agréable."
    },
    creation: {
      title: "Création de sites et d’interfaces",
      text: "Je développe des sites web et interfaces sur mesure, adaptés à votre activité, responsive et optimisés pour tous les supports."
    },
    analyse: {
      title: "Analyse des parcours utilisateurs",
      text: "J’observe et analyse le comportement des visiteurs sur votre site afin d’identifier les points de friction et proposer des optimisations stratégiques."
    }
  };

  serviceButtons.forEach(button => {
    button.addEventListener("click", () => {
      serviceButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const key = button.getAttribute("data-service");
      const content = servicesContent[key];

      serviceDetail.innerHTML = `<h3>${content.title}</h3><p>${content.text}</p>`;
    });
  });

  // ------------------------------
  // Clic sur le logo ou h1 accueil
  // ------------------------------
  const accueilBtn = document.querySelector("header h1, .nav-logo a");
  if (accueilBtn) {
    accueilBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  console.log("Scripts du site initialisés ✅");

  window.renderGallery = function(project) {
    const container = document.getElementById("galleryContainer");
    if (!container || !project.gallery) return;
  
    container.innerHTML = project.gallery.map(section => {
      const imgs = section.images.map(img =>
        `<div class="gallery-card">
           <img src="${img}" alt="${project.NomProjet}">
         </div>`
      ).join("");
  
      return `
        <div class="gallery-block">
          <h4>${section.category}</h4>
          <div class="gallery-grid">${imgs}</div>
        </div>
      `;
    }).join("");
  }   
});
