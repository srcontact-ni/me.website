console.log("JavaScript chargé ✅");

// Exemple : un clic sur un bouton qui affiche un message
document.addEventListener("DOMContentLoaded", () => {
  const accueilBtn = document.querySelector("header h1");
  if (accueilBtn) {
    accueilBtn.addEventListener("click", () => {
      alert("Bienvenue sur mon portfolio !");
    });
  }
});

// Charger le header
fetch('partials/header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  })
  .catch(err => console.error("Erreur chargement header :", err));

// Charger le footer
fetch('partials/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  })
  .catch(err => console.error("Erreur chargement footer :", err));

  document.addEventListener("DOMContentLoaded", () => {
    // Sélectionner tous les boutons de services
    const serviceButtons = document.querySelectorAll(".service-item");
    const serviceDetail = document.getElementById("serviceDetail");
  
    // Contenu pour chaque service
    const servicesContent = {
      seo: {
        title: "Optimisation SEO",
        text: "J’analyse les performances de votre site, optimise la structure, le contenu et les balises pour améliorer votre visibilité sur les moteurs de recherche. L’objectif : attirer un trafic qualifié et durable."
      },
      content: {
        title: "Gestion de contenu web",
        text: "Je crée, organise et optimise votre contenu web pour qu’il soit pertinent, cohérent et engageant. Cela inclut articles, pages, images et balises SEO pour maximiser l’impact."
      },
      uxui: {
        title: "UX / UI Design",
        text: "Je conçois des interfaces intuitives et esthétiques pour offrir une expérience utilisateur fluide et agréable, favorisant l’engagement et la conversion."
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
  
    // Ajouter l’événement click à chaque bouton
    serviceButtons.forEach(button => {
      button.addEventListener("click", () => {
        // Retirer la classe active de tous les boutons
        serviceButtons.forEach(btn => btn.classList.remove("active"));
        // Ajouter la classe active au bouton cliqué
        button.classList.add("active");
  
        // Récupérer la clé du service
        const serviceKey = button.getAttribute("data-service");
        const content = servicesContent[serviceKey];
  
        // Mettre à jour le contenu dynamique
        serviceDetail.innerHTML = `<h3>${content.title}</h3><p>${content.text}</p>`;
      });
    });
  });
  
