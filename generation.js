/* Commentaire genere pour pablo */
/*
 * Gestionnaire de génération de Pokémons
 * Ce fichier contient la classe GenerationManager qui gère:
 * - Le chargement et l'affichage des Pokémons par génération
 * - La création d'un menu pour naviguer entre les différentes générations
 * - Le filtrage des Pokémons selon leur génération
 */

class GenerationManager {
  // Constructeur initialisant les propriétés et les données des générations
  constructor() {
    // Initialiser le tableau qui contiendra tous les pokémons
    this.pokemons = [];
    
    // Définir les générations avec leurs plages d'ID
    this.generations = [
      { id: 1, name: "Génération 1", range: [1, 151] },
      { id: 2, name: "Génération 2", range: [152, 251] },
      { id: 3, name: "Génération 3", range: [252, 386] },
      { id: 4, name: "Génération 4", range: [387, 493] },
      { id: 5, name: "Génération 5", range: [494, 649] },
      { id: 6, name: "Génération 6", range: [650, 721] },
      { id: 7, name: "Génération 7", range: [722, 809] },
      { id: 8, name: "Génération 8", range: [810, 905] },
      { id: 9, name: "Génération 9", range: [906, 1010] }
    ];
  }

  // Méthode pour récupérer tous les pokémons depuis l'API
  async fetchAllPokemons() {
    try {
      console.log("Récupération des données des pokémons...");
      const response = await fetch('https://pokebuildapi.fr/api/v1/pokemon');
      
      // Vérifier si la requête a réussi
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      // Stocker les données et afficher des informations de débogage
      this.pokemons = await response.json();
      console.log(`${this.pokemons.length} pokémons récupérés`);
      console.log("Structure de données:", this.pokemons[0]);
      
      // Créer le menu des générations et afficher la première génération
      this.createGenerationMenu();
      this.displayPokemonsByGeneration(1);
    } catch (error) {
      // Gérer les erreurs
      console.error('Erreur lors du chargement des données:', error);
      const container = document.getElementById('generation-container');
      container.innerHTML = `<div class="error-message">Impossible de charger les données: ${error.message}</div>`;
    }
  }

  // Méthode pour créer le menu de sélection des générations
  createGenerationMenu() {
    // Récupérer le conteneur du menu
    const menuContainer = document.getElementById('generation-menu');
    menuContainer.innerHTML = '';
    
    // Créer un conteneur pour les boutons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('generation-buttons');
    
    // Créer un bouton pour chaque génération
    this.generations.forEach(gen => {
      const button = document.createElement('button');
      button.innerText = gen.name;
      button.classList.add('generation-btn');
      button.addEventListener('click', () => this.displayPokemonsByGeneration(gen.id));
      buttonContainer.appendChild(button);
    });
    
    // Ajouter les boutons au conteneur du menu
    menuContainer.appendChild(buttonContainer);
  }

  // Méthode pour afficher les Pokémons d'une génération spécifique
  displayPokemonsByGeneration(genId) {
    // Récupérer le conteneur où afficher les Pokémons
    const container = document.getElementById('generation-container');
    container.innerHTML = '';
    
    // Trouver la génération sélectionnée
    const generation = this.generations.find(gen => gen.id === genId);
    if (!generation) {
      console.error(`Génération ${genId} non trouvée`);
      return;
    }
    
    console.log(`Affichage de la génération ${genId}: ${generation.name}`);
    
    // Créer un titre pour la génération
    const genTitle = document.createElement('h2');
    genTitle.textContent = generation.name;
    container.appendChild(genTitle);
    
    // Créer une grille pour les pokémons
    const pokemonGrid = document.createElement('div');
    pokemonGrid.classList.add('pokemon-grid');
    
    // Filtrer les pokémons appartenant à cette génération
    const genPokemons = this.pokemons.filter(pokemon => 
      pokemon.id >= generation.range[0] && 
      pokemon.id <= generation.range[1]
    );
    
    console.log(`Nombre de pokémons dans cette génération: ${genPokemons.length}`);
    
    // Vérifier si des Pokémons ont été trouvés
    if (genPokemons.length === 0) {
      console.warn("Aucun pokémon trouvé pour cette génération. Vérification du format des données...");
      console.log("Premier pokémon de la liste:", this.pokemons[0]);
    }
    
    // Créer une carte pour chaque Pokémon de la génération
    genPokemons.forEach(pokemon => {
      try {
        // Créer la carte du Pokémon
        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        
        // Gérer l'image du Pokémon
        if (!pokemon.image) {
          console.warn(`Image manquante pour le pokémon ${pokemon.name || pokemon.id}`);
          const image = document.createElement('img');
          image.src = "/image/inconnu.png";
          image.alt = pokemon.name || "Pokémon inconnu";
          card.appendChild(image);
        } else {
          const image = document.createElement('img');
          image.src = pokemon.image;
          image.alt = pokemon.name || "Pokémon";
          image.onerror = function() {
            this.onerror = null;
            this.src = "/image/inconnu.png";
          };
          card.appendChild(image);
        }
        
        // Ajouter le nom du Pokémon
        const name = document.createElement('h3');
        name.textContent = pokemon.name || "Pokémon #" + pokemon.id;
        card.appendChild(name);
        
        // Ajouter l'ID du Pokémon
        const id = document.createElement('p');
        id.textContent = `#${pokemon.id}`;
        card.appendChild(id);
        
        // Ajouter les types du Pokémon
        const typeContainer = document.createElement('div');
        typeContainer.classList.add('pokemon-types');
        
        if (pokemon.apiTypes && pokemon.apiTypes.length > 0) {
          pokemon.apiTypes.forEach(typeData => {
            const typeSpan = document.createElement('span');
            const typeName = typeData.name ? typeData.name.toLowerCase() : '';
            typeSpan.classList.add('pokemon-type', `type-${typeName}`);
            
            // Ajout d'un log détaillé pour vérifier le type et la correspondance
            console.log(`Type du Pokémon ${pokemon.name} (ID: ${pokemon.id}): ${typeData.name} -> classe CSS: type-${typeName}`);
            
            typeSpan.textContent = typeData.name || "Type";
            typeContainer.appendChild(typeSpan);
          });
        } else {
          // Si aucun type n'est défini, ajouter "Type inconnu"
          const typeSpan = document.createElement('span');
          typeSpan.classList.add('pokemon-type');
          typeSpan.textContent = "Type inconnu";
          typeContainer.appendChild(typeSpan);
        }
        
        // Ajouter le conteneur de types à la carte
        card.appendChild(typeContainer);
        pokemonGrid.appendChild(card);
      } catch (e) {
        console.error(`Erreur lors de la création de la carte pour le pokémon ${pokemon.id}:`, e);
      }
    });
    
    // Ajouter la grille au conteneur principal
    container.appendChild(pokemonGrid);
    
    // Afficher un message si aucun Pokémon n'est trouvé
    if (genPokemons.length === 0) {
      const errorMsg = document.createElement('p');
      errorMsg.textContent = "Aucun pokémon trouvé pour cette génération.";
      errorMsg.classList.add('no-pokemon-message');
      container.appendChild(errorMsg);
    }
  }
}

// Initialiser le gestionnaire de générations quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  const genManager = new GenerationManager();
  genManager.fetchAllPokemons();
});
