console.log("JavaScript chargé sur GitHub Pages ✅");

// Tout ton JavaScript directement
initSiteScripts();


// -----------------------------------------------------------
//  FONCTION PRINCIPALE
// -----------------------------------------------------------
function initSiteScripts() {

  console.log("Scripts du site initialisés.");

  // Exemple accueil
  const accueilBtn = document.querySelector("header h1");
  if (accueilBtn) {
    accueilBtn.addEventListener("click", () => {
      alert("Bienvenue sur mon portfolio !");
    });
  }

  // --- Scripts Services ---
  const serviceButtons = document.querySelectorAll(".service-item");
  const serviceDetail = document.getElementById("serviceDetail");

  const servicesContent = {
    seo: {
      title: "Optimisation SEO",
      text: "J’analyse les performances…"
    },
    content: {
      title: "Gestion de contenu web",
      text: "Je crée, organise…"
    },
    uxui: {
      title: "UX / UI Design",
      text: "Je conçois des interfaces…"
    },
    creation: {
      title: "Création de sites",
      text: "Je développe des sites…"
    },
    analyse: {
      title: "Analyse des parcours",
      text: "J’observe et analyse…"
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
}
