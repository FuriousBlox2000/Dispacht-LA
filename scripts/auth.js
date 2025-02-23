document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // ❌ Empêche le rechargement de la page

    const identifiant = document.getElementById("identifiant").value;
    const password = document.getElementById("password").value;

    fetch("https://api.jsonbin.io/v3/b/67bb5c6fad19ca34f80f7168/latest", {
        headers: { "X-Master-Key": "$2a$10$2SQuMlcb08504.lkYUFZrOVwEhnLOy9TOw/SLJvegIuyG0gntU6Ni" }
    })
    .then(response => response.json())
    .then(data => {
        const users = data.record; // 📌 Les utilisateurs sont stockés sous "record"
        const user = users.find(u => u.username === identifiant && u.password === password);

        if (user) {
            localStorage.setItem("user", JSON.stringify(user)); // ✅ Stocke l'utilisateur
            window.location.href = "../pages/dashboard.html"; // ✅ Redirection après connexion
        } else {
            alert("Identifiant ou mot de passe incorrect !");
        }
    })
    .catch(error => console.error("Erreur lors du chargement des comptes:", error));
});
