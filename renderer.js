function goBack() {
    window.location.href = "dashboard.html"; // Assure-toi du bon chemin
}

function logout() {
    localStorage.removeItem("user"); // Supprime l'utilisateur stocké
    window.location.href = "login.html"; // Retour à la connexion
}

document.getElementById("login-btn").addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await window.electronAPI.login(username, password);
    
    if (response.success) {
        document.getElementById("login-screen").classList.add("hidden");
        document.getElementById("app-screen").classList.remove("hidden");

        if (response.role === "admin") {
            document.getElementById("admin-panel").classList.remove("hidden");
        }
    } else {
        document.getElementById("login-error").innerText = response.message;
    }
});
