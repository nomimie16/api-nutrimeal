import http from 'http';
import { Router } from 'express';
import { getRecettes,  getRecettesbyCategorie, getRecettesbyId, getIngrediens, getValeursNutritionnelles } from './recettes.controller';


// Création du serveur HTTP
const server = http.createServer((req, res) => {
    // Vérification de la méthode de la requête
    if (req.method === 'GET') {
        // Définition du code de statut de la réponse à 200 (OK)
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        // Envoi de la réponse
        res.end('Requête GET réussie avec code 200\n');
    }
    if (req.method === 'POST') {
        res.writeHead(201, { 'Content-Type': 'text/plain' });
        // Envoi de la réponse
        res.end('Création réussie avec code 201\n');
    } 

    else {
        // Si la méthode de la requête n'est pas GET, renvoyer un code 405 (Method NotAllowed)
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Méthode non autorisée\n');
    }
});

// Démarrage du serveur sur le port 3000
server.listen(3000, () => {
    console.log("Serveur en cours d'écoute sur le port 3000...");
});