document.addEventListener("DOMContentLoaded", function () {
    const user = localStorage.getItem("user");

    if (!user) {
        window.location.href = "../pages/login.html"; // ✅ Redirige si l'utilisateur n'est pas connecté
    }

    document.getElementById("user-name").textContent = user;

    document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("user"); // ✅ Déconnecte l'utilisateur
        window.location.href = "../pages/login.html";
    });
});
