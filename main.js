const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const bcrypt = require("bcryptjs");
const Database = require("better-sqlite3");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("API en ligne !");
});

app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur le port ${PORT}`);
});

// Initialisation de la base de données SQLite
const db = new Database(path.join(__dirname, "database", "database.db"));

// Fenêtre principale
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"), // Sécurité avec preload
        }
    });

    mainWindow.loadFile("pages/login.html"); // Charge la page de connexion
}

app.whenReady().then(createWindow);

// Gestion de la connexion utilisateur via SQLite
ipcMain.handle("login", async (event, username, password) => {
    try {
        const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);

        if (user && bcrypt.compareSync(password, user.password)) {
            return { success: true, role: user.role };
        } else {
            return { success: false, message: "Identifiant ou mot de passe incorrect" };
        }
    } catch (error) {
        console.error("Erreur de connexion:", error);
        return { success: false, message: "Erreur interne du serveur" };
    }
});

// Après connexion, on charge la page principale
ipcMain.on("login-success", () => {
    mainWindow.loadFile("pages/main.html");
});

// Fermeture de l'application quand toutes les fenêtres sont fermées
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
