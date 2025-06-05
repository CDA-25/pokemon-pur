/* Commentaire genere pour pablo */
/*
 * Utilitaire pour récupérer les noms de tous les Pokémons
 * Ce fichier contient une fonction qui:
 * - Se connecte à l'API des Pokémons
 * - Récupère tous les Pokémons disponibles
 * - Extrait et affiche uniquement leurs noms
 */

import fetch from 'node-fetch';

// Fonction asynchrone qui récupère et affiche les noms des Pokémons
async function getPokemonNames() {
    // URL de l'API Pokémon
    const url = 'https://pokebuildapi.fr/api/v1/pokemon';
    try {
        // Faire la requête à l'API
        const response = await fetch(url);
        // Convertir la réponse en JSON
        const data = await response.json();
        // Extraire seulement les noms des Pokémons
        const names = data.map(pokemon => pokemon.name);
        // Afficher les noms dans la console
        console.log(names);
    } catch (error) {
        // Gérer les erreurs
        console.error('Erreur lors de la récupération des données:', error);
    }
}

// Exécuter la fonction
getPokemonNames();
