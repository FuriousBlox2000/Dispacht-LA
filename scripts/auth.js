document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // ❌ Empêche le rechargement de la page

    const identifiant = document.getElementById("identifiant").value;
    const password = document.getElementById("password").value;

    fetch("../database/comptes.json") // ✅ Charge les comptes depuis le JSON
        .then(response => response.json())
        .then(data => {
            const users = data.users;
            const user = users.find(u => u.username === identifiant && u.password === password);

            if (user) {
                localStorage.setItem("user", identifiant); // ✅ Stocke l'utilisateur
                window.location.href = "../pages/dashboard.html"; // ✅ Redirection après connexion
            } else {
                alert("Identifiant ou mot de passe incorrect !");
            }
        })
        .catch(error => console.error("Erreur lors du chargement du JSON:", error));
});
