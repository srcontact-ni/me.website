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

// Charger header et footer
document.addEventListener("DOMContentLoaded", () => {
  fetch("partials/header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;
    });

  fetch("partials/footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    });
});

