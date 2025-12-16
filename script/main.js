console.log("JavaScript chargé ✅");

document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // MENU MOBILE (Hamburger)
  // ==============================
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // ==============================
  // SOUS-MENUS
  // ==============================
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

        if (navLinks.classList.contains('active')) navLinks.classList.remove('active');
      }
    });
  });

  // ==============================
  // SERVICES
  // ==============================
  const serviceButtons = document.querySelectorAll(".service-item");
  const serviceDetail = document.getElementById("serviceDetail");

  const servicesContent = {
    seo: {
      title: "Renfort digital en alternance",
      text: "Soutien opérationnel pour les équipes marketing digitales : intégration de maquettes simple, mise à jour de contenus et amélioration de l'expérience utilisateur, pour avancer plus vite sur les projets web."
    },
    content: {
      title: "Création de sites vitrines",
      text: "Conception de site vitrines clairs, modernes et responsives pour petites entreprises et indépendants, afin de présenter l'activité de façon professionnelle et de générer davantage de prises de contact."
    },
    uxui: {
      title: "Refonte de sites existants",
      text: "Mise à niveau de sites déjà en ligne pour les rendre plus lisibles, actuels et efficaces. Structure, contenus et design sont retravaillées pour mieux parler aux clients et soutenir les objectifs business."
    },
    creation: {
      title: "Conception de landing pages",
      text: "Création de pages uniques dédiées à une offre, un produit ou un évènement. Chaque section est pensée pour guider le visiteur vers une action précise : demande de devis, inscription ou prise de contact."
    },
    analyse: {
      title: "Testeuse UX/logiciels",
      text: "Analyse frictions invisibles avec Hotjar, test parcours stratégiques (panier, réservation), NPS pages clés, specs Redmine précises pour prestataires."
    }
  };

  serviceButtons.forEach(button => {
    button.addEventListener("click", () => {
      serviceButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const key = button.getAttribute("data-service");
      const content = servicesContent[key];

      if(serviceDetail && content) {
        serviceDetail.innerHTML = `<h3>${content.title}</h3><p>${content.text}</p>`;
      }
    });
  });

  // ==============================
  // CLIC SUR LOGO OU H1 ACCUEIL
  // ==============================
  const accueilBtn = document.querySelector("header h1, .nav-logo a");
  if (accueilBtn) {
    accueilBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  console.log("Scripts initiaux ✅");

  // ==============================
  // CHARGEMENT DES PROJETS JSON
  // ==============================
  let projectsData = [];

  fetch('projects.json')
    .then(res => res.json())
    .then(data => {
      projectsData = data;
      console.log("Projets chargés ✅", projectsData);

      const urlParams = new URLSearchParams(window.location.search);
      const projectId = urlParams.get('id');

      if(projectId) {
        const project = projectsData.find(p => p.ID === projectId);
        if(project) {
          renderProjectDetails(project);
          renderGallery(project);
        } else {
          console.warn("Projet introuvable pour l'ID :", projectId);
        }
      }
    })
    .catch(err => console.error("Erreur chargement JSON :", err));

  // ==============================
  // AFFICHER LES DÉTAILS DU PROJET
  // ==============================
  function renderProjectDetails(project) {
    const titleEl = document.getElementById("projectTitle");
    const descEl = document.getElementById("projectDesc");
    const aProposEl = document.getElementById("projectAPropos");

    if(titleEl) titleEl.textContent = project.NomProjet;
    if(descEl) descEl.textContent = project.ShortDesc;
    if(aProposEl) aProposEl.textContent = project.AProposEntreprise;

    // Logos sites du groupe
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

  // ==============================
  // FONCTION GALERIE
  // ==============================
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

    const ENDPOINT_URL = "https://script.google.com/macros/s/AKfycbxIuVARtbk5s23gOwQ7OALW1y5lT3YZvL-Q5BrOdxeynE4ka7zeA3hg98OurK5dCZo/exec";

    fetch(ENDPOINT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(() => {
      formResponse.textContent = "Message envoyé ✅ Un email de confirmation vous a été envoyé.";
      contactForm.reset();
    })
    .catch(err => {
      console.error(err);
      formResponse.textContent = "Erreur lors de l'envoi ❌";
    });
  };

});