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
  // SOUS-MENUS (mobile)
  // ==============================
  const submenuParents = document.querySelectorAll(".has-submenu > a");

  submenuParents.forEach(parent => {
    parent.addEventListener("click", e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const submenu = parent.nextElementSibling;
        if (submenu) submenu.classList.toggle("active");
      }
    });
  });

  // Scroll vers section depuis sous-menu services (#seo, #content…)
  document.querySelectorAll(".submenu a").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const targetId = href.replace("#", "");
      const targetBtn = document.getElementById(targetId);

      if (targetBtn) {
        e.preventDefault();
        targetBtn.scrollIntoView({ behavior: "smooth", block: "start" });
        targetBtn.click();

        if (navLinks && navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
        }
      }
    });
  });

  // ==============================
  // SERVICES (contenu dynamique)
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
      text: "Conception de sites vitrines clairs, modernes et responsives pour petites entreprises et indépendants, afin de présenter l'activité de façon professionnelle et de générer davantage de prises de contact."
    },
    uxui: {
      title: "Refonte de sites existants",
      text: "Mise à niveau de sites déjà en ligne pour les rendre plus lisibles, actuels et efficaces. Structure, contenus et design sont retravaillés pour mieux parler aux clients et soutenir les objectifs business."
    },
    creation: {
      title: "Conception de landing pages",
      text: "Création de pages uniques dédiées à une offre, un produit ou un évènement. Chaque section est pensée pour guider le visiteur vers une action précise : demande de devis, inscription ou prise de contact."
    },
    analyse: {
      title: "Testeuse UX/logiciels",
      text: "Analyse des frictions invisibles avec Hotjar, test des parcours stratégiques (panier, réservation), NPS sur les pages clés, spécifications précises pour les prestataires."
    }
  };

  serviceButtons.forEach(button => {
    button.addEventListener("click", () => {
      serviceButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const key = button.getAttribute("data-service");
      const content = servicesContent[key];

      if (serviceDetail && content) {
        serviceDetail.innerHTML = `<h3>${content.title}</h3><p>${content.text}</p>`;
      }
    });
  });

  // ==============================
  // SERVICES MOBILE : scroll au doigt
  // ==============================
  // Géré uniquement par le CSS (overflow-x: auto sur .services-list)

  // ==============================
  // CLIC SUR LOGO
  // ==============================
  const accueilBtn = document.querySelector(".nav-logo a");
  if (accueilBtn) {
    accueilBtn.addEventListener("click", e => {
      e.preventDefault();
      window.location.href = "index.html";
    });
  }

  console.log("Scripts initiaux ✅");

  // ==============================
  // PAGE PROJET UNIQUEMENT (project.html)
  // ==============================
  const projectTitleEl = document.getElementById("projectTitle");
  if (projectTitleEl) {
    let projectsData = [];

    fetch("assets/projects.json")
      .then(res => res.json())
      .then(data => {
        projectsData = data;
        console.log("Projets chargés ✅", projectsData);

        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get("id");

        if (projectId) {
          const project = projectsData.find(p => p.ID === projectId);
          if (project) {
            renderProjectDetails(project);
            if (project.gallery) {
              renderGallery(project);
            }
            renderRelatedProjects(projectsData, projectId);
          } else {
            console.warn("Projet introuvable pour l'ID :", projectId);
          }
        }
      })
      .catch(err => console.error("Erreur chargement JSON :", err));
  }

  // ==============================
  // AFFICHER LES DÉTAILS DU PROJET
  // ==============================
  function renderProjectDetails(project) {
    const titleEl    = document.getElementById("projectTitle");
    const descEl     = document.getElementById("projectDesc");
    const accrocheEl = document.getElementById("phraseAccroche");
    const aProposEl  = document.getElementById("projectAPropos");
    const sitesEl    = document.getElementById("projectSitesGroupe");
    const missionsEl = document.getElementById("projectMissions");
    const outilsEl   = document.getElementById("projectOutils");
    const langagesEl = document.getElementById("projectLangages");

    if (titleEl)    titleEl.textContent    = project.NomProjet;
    if (descEl)     descEl.textContent     = project.ShortDesc;
    if (accrocheEl) accrocheEl.textContent = project.PhraseAccroche || "";
    if (aProposEl)  aProposEl.textContent  = project.AProposEntreprise || "";

    if (sitesEl && project.SitesGroupe) {
      sitesEl.innerHTML = project.SitesGroupe.map(site =>
        `<a href="${site.lien}" target="_blank" title="${site.nom}">
           <img src="${site.logo}" alt="${site.nom}">
         </a>`
      ).join("");
    }

    if (missionsEl && project.Missions) {
      missionsEl.innerHTML = project.Missions
        .map(m => `<div class="mission-item">${m}</div>`)
        .join("");
    }

    if (outilsEl && project.Outils) {
      outilsEl.innerHTML = project.Outils.map(o =>
        `<div class="tool-item">
           <img src="${o.logo}" alt="${o.nom}">
           <span>${o.nom}</span>
         </div>`
      ).join("");
    }

    if (langagesEl && project.Langages) {
      langagesEl.innerHTML = project.Langages.map(l =>
        `<div class="tool-item">
           <img src="${l.logo}" alt="${l.nom}">
           <span>${l.nom}</span>
         </div>`
      ).join("");
    }

    const secteurEl      = document.getElementById("projectSecteur");
    const localisationEl = document.getElementById("projectLocalisation");
    const dureeEl        = document.getElementById("projectDuree");
    const clientEl       = document.getElementById("projectClient");
    const linkEl         = document.getElementById("projectLink");

    if (secteurEl)      secteurEl.textContent      = project.Secteur || "";
    if (localisationEl) localisationEl.textContent = project.Localisation || "";
    if (dureeEl)        dureeEl.textContent        = project.Duree || "";
    if (clientEl)       clientEl.textContent       = project.NomProjet || "";

    if (linkEl && project.LienExterne) {
      linkEl.innerHTML = `<a href="${project.LienExterne}" target="_blank">Voir le projet</a>`;
    }
  }

  // ==============================
  // GALERIE
  // ==============================
  function renderGallery(project) {
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

  // ==============================
  // AUTRES RÉALISATIONS
  // ==============================
  function renderRelatedProjects(projects, currentId) {
    const related = document.getElementById("relatedProjects");
    if (!related) return;

    related.innerHTML = "";

    projects
      .filter(p => p.ID !== currentId)
      .forEach(p => {
        const card = document.createElement("article");
        card.className = "card";
        card.innerHTML = `
          <a href="project.html?id=${encodeURIComponent(p.ID)}" class="card-link">
            <div class="card-visual">
              <img src="${p.Image}" alt="${p.NomProjet}" />
            </div>
            <div class="card-content">
              <h3>${p.NomProjet}</h3>
              <p>${p.ShortDesc}</p>
            </div>
          </a>
        `;
        related.appendChild(card);
      });
  }

  // ------------------------------
  // FORMULAIRE DE CONTACT
  // ------------------------------
  const contactForm  = document.getElementById("contactForm");
  const formResponse = document.getElementById("formResponse");

  window.sendContact = function (e) {
    e.preventDefault();

    const formData = {
      nom:     document.getElementById("nom").value,
      societe: document.getElementById("societe").value,
      tel:     document.getElementById("tel").value,
      email:   document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    const ENDPOINT_URL = "https://script.google.com/macros/s/AKfycbxIuVARtbk5s23gOwQ7OALW1y5lT3YZvL-Q5BrOdxeynE4ka7zeA3hg98OurK5dCZo/exec";

    fetch(ENDPOINT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        if (formResponse) {
          formResponse.textContent = "Message envoyé ✅ Un email de confirmation vous a été envoyé.";
        }
        if (contactForm) contactForm.reset();
      })
      .catch(err => {
        console.error(err);
        if (formResponse) {
          formResponse.textContent = "Erreur lors de l'envoi ❌";
        }
      });
  };
});
