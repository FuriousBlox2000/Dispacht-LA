document.addEventListener("DOMContentLoaded", () => {
    loadAccounts();
});

function loadAccounts() {
    fetch("../database/comptes.json")
        .then(response => response.json())
        .then(users => {
            const accountList = document.getElementById("account-list");
            accountList.innerHTML = "";
            users.forEach(user => {
                const div = document.createElement("div");
                div.innerText = `${user.username} - ${user.rank}`;
                accountList.appendChild(div);
            });
        })
        .catch(error => console.error("Erreur de chargement des comptes:", error));
}

function addUser() {
    const username = document.getElementById("new-username").value;
    const rank = document.getElementById("user-rank").value;

    if (!username) {
        alert("Veuillez entrer un nom d'utilisateur.");
        return;
    }

    fetch("../database/comptes.json")
        .then(response => response.json())
        .then(users => {
            users.push({ username, rank });

            // Enregistrer dans le fichier JSON (nécessite un serveur backend)
            console.log("Nouvel utilisateur ajouté:", { username, rank });

            loadAccounts();
        })
        .catch(error => console.error("Erreur d'ajout:", error));
}
