console.log("JavaScript chargé sur GitHub Pages ✅");

// -----------------------------------------------------------
// 1) Charger HEADER + FOOTER puis lancer tout le site
// -----------------------------------------------------------
Promise.all([
    fetch("partials/header.html").then(res => res.text()),
    fetch("partials/footer.html").then(res => res.text())
])
.then(([headerData, footerData]) => {

    const headerEl = document.getElementById("header");
    const footerEl = document.getElementById("footer");

    if (headerEl) headerEl.innerHTML = headerData;
    if (footerEl) footerEl.innerHTML = footerData;

    console.log("Header et footer chargés.");

    // Maintenant que le header est chargé → on lance les scripts du site
    initSiteScripts();
})
.catch(err => console.error("Erreur chargement des partials :", err));


// -----------------------------------------------------------
// 2) Scripts du site (tout ton code ici)
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

    // Scripts Services
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

            const key = button.dataset.service;
            const content = servicesContent[key];

            serviceDetail.innerHTML = `
                <h3>${content.title}</h3>
                <p>${content.text}</p>
            `;
        });
    });
}
