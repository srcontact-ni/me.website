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
