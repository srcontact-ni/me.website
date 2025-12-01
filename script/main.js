Console.log("JavaScript chargé ✅");

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
// ------------------------------
// CHARGEMENT DES PROJETS JSON
// ------------------------------
let projectsData = [];

fetch('projects.json') // ou le chemin correct vers ton JSON
  .then(res => res.json())
  .then(data => {
    projectsData = data;
    console.log("Projets chargés ✅", projectsData);

    // Récupérer l'ID du projet depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if(projectId) {
      const project = projectsData.find(p => p.ID === projectId);
      if(project) {
        renderGallery(project);
        renderProjectDetails(project);
      } else {
        console.warn("Projet introuvable pour l'ID :", projectId);
      }
    }
  })
  .catch(err => console.error("Erreur chargement JSON :", err));

// ------------------------------
// AFFICHER LES DÉTAILS DU PROJET
// ------------------------------
function renderProjectDetails(project) {
  const titleEl = document.getElementById("projectTitle");
  const descEl = document.getElementById("projectDesc");
  const aProposEl = document.getElementById("projectAPropos");

  if(titleEl) titleEl.textContent = project.NomProjet;
  if(descEl) descEl.textContent = project.ShortDesc;
  if(aProposEl) aProposEl.textContent = project.AProposEntreprise;

  // Exemple : afficher logos sites du groupe
  const sitesContainer = document.getElementById("projectSites");
  if(sitesContainer && project.SitesGroupe) {
    sitesContainer.innerHTML = project.SitesGroupe.map(site =>
      `<a href="${site.lien}" target="_blank" title="${site.nom}">
         <img src="${site.logo}" alt="${site.nom}">
       </a>`).join("");
  }

  // Missions
  const missionsContainer = document.getElementById("projectMissions");
  if(missionsContainer && project.Missions) {
    missionsContainer.innerHTML = project.Missions.map(m => `<li>${m}</li>`).join("");
  }

  // Outils
  const outilsContainer = document.getElementById("projectOutils");
  if(outilsContainer && project.Outils) {
    outilsContainer.innerHTML = project.Outils.map(o =>
      `<img src="${o.logo}" alt="${o.nom}" title="${o.nom}">`).join("");
  }

  // Langages
  const langagesContainer = document.getElementById("projectLangages");
  if(langagesContainer && project.Langages) {
    langagesContainer.innerHTML = project.Langages.map(l =>
      `<img src="${l.logo}" alt="${l.nom}" title="${l.nom}">`).join("");
  }
}

// ------------------------------
// FONCTION EXISTANTE GALERIE
// ------------------------------
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
  };

  // ------------------------------
// FORMULAIRE DE CONTACT
// ------------------------------
  const contactForm = document.getElementById("contactForm");
  const formResponse = document.getElementById("formResponse");

  window.sendContact = function(e) {
    e.preventDefault();

    const formData = {
      nom: document.getElementById("nom").value,
      societe: document.getElementById("societe").value,
      tel: document.getElementById("tel").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    // L'URL ici, c'est l'URL de ton Web App Apps Script
    const ENDPOINT_URL = "https://script.google.com/macros/s/AKfycby1H19NzawMU2d5KOFnhemJJMqBZMkWuTslNEDxMl8M4xv3OAxJhzVAwNnZnLEAwiI/exec";

    fetch(ENDPOINT_URL, {
      method: "POST",
      mode: "no-cors", // Important si ton script n'a pas le CORS activé
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(() => {
      formResponse.textContent = "Message envoyé ✅";
      contactForm.reset();
    })
    .catch(err => {
      console.error(err);
      formResponse.textContent = "Erreur lors de l'envoi ❌";
    });
      };
});

