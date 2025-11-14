console.log("JavaScript chargé ✅");

// Charger le header
fetch('partials/header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;

    // Menu hamburger après injection du header
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  })
  .catch(err => console.error("Erreur chargement header :", err));

// Charger le footer
fetch('partials/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  })
  .catch(err => console.error("Erreur chargement footer :", err));
