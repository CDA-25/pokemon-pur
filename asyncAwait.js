/* Commentaire genere pour pablo */
/*
 * Gestionnaire principal des Pokémons pour la page Pokédex
 * Ce fichier contient la classe PokemonManager qui gère:
 * - Le chargement des données des Pokémons depuis l'API
 * - L'affichage des cartes Pokémons dans la grille
 * - La gestion des détails de chaque Pokémon dans une popup
 */

class PokemonManager {
  // Constructeur initialisant les propriétés et les événements de fermeture du popup
  constructor() {
    // Initialiser les propriétés principales
    this.pokemons = [];
    this.pokemonContainer = document.getElementById('pokemon-container');
    this.popup = document.getElementById('popup');
    this.popupContent = document.getElementById('popup-content');
    this.closePopupBtn = document.getElementById('close-popup');
    
    // Configurer l'événement de fermeture du popup par le bouton
    this.closePopupBtn.addEventListener('click', () => this.closePopup());
    
    // Configurer la fermeture du popup en cliquant en dehors
    window.addEventListener('click', (event) => {
      if (event.target === this.popup) {
        this.closePopup();
      }
    });
  }

  // Méthode asynchrone pour récupérer les données des Pokémons depuis l'API
  async fetchPokemons() {
    try {
      console.log("Récupération des données de tous les Pokémon...");
      const response = await fetch('https://pokebuildapi.fr/api/v1/pokemon');
      
      // Vérifier si la requête a réussi
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      // Convertir la réponse en JSON et l'assigner à la propriété pokemons
      this.pokemons = await response.json();
      console.log(`${this.pokemons.length} Pokémon récupérés`);
      console.log("Structure d'un Pokémon:", this.pokemons[0]);
      
      // Afficher les Pokémons dans la grille
      this.displayPokemons();
    } catch (error) {
      // Gérer les erreurs
      console.error('Erreur lors du chargement des Pokémon:', error);
      this.pokemonContainer.innerHTML = `<div class="error-message">Impossible de charger les données: ${error.message}</div>`;
    }
  }

  // Méthode pour afficher tous les Pokémons dans la grille
  displayPokemons() {
    // Vider le conteneur
    this.pokemonContainer.innerHTML = '';
    
    // Parcourir tous les Pokémons et créer une carte pour chacun
    this.pokemons.forEach(pokemon => {
      try {
        // Créer la carte du Pokémon
        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        card.dataset.id = pokemon.id;
        
        // Stocker les types du Pokémon pour le filtrage
        const pokemonTypes = pokemon.apiTypes.map(type => type.name);
        card.dataset.types = pokemonTypes.join(',');
        
        // Ajouter l'événement pour afficher les détails
        card.addEventListener('click', () => this.openPokemonDetails(pokemon.id));
        
        // Créer l'élément image
        const image = document.createElement('img');
        image.src = pokemon.image;
        image.alt = pokemon.name;
        image.onerror = function() {
          this.onerror = null;
          this.src = "/image/inconnu.png"; // Image par défaut si l'image d'origine ne charge pas
        };
        
        // Ajouter le nom du Pokémon
        const name = document.createElement('h3');
        name.textContent = pokemon.name;
        
        // Ajouter l'ID du Pokémon
        const id = document.createElement('p');
        id.textContent = `#${pokemon.id}`;
        
        // Créer le conteneur pour les types
        const typeContainer = document.createElement('div');
        typeContainer.classList.add('pokemon-types');
        
        // Création des badges de type
        if (pokemon.apiTypes && pokemon.apiTypes.length > 0) {
          pokemon.apiTypes.forEach(typeData => {
            const typeSpan = document.createElement('span');
            const typeName = typeData.name ? typeData.name.toLowerCase() : '';
            typeSpan.classList.add('pokemon-type', `type-${typeName}`);  // Classe CSS pour la couleur du type
            typeSpan.textContent = typeData.name;
            
            // Ajout d'un log pour vérifier le type et sa classe CSS correspondante
            console.log(`Type trouvé: ${typeData.name} -> classe CSS: type-${typeName}`);
            
            typeContainer.appendChild(typeSpan);
          });
        }
        
        // Assembler tous les éléments de la carte
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(id);
        card.appendChild(typeContainer);
        
        // Ajouter la carte au conteneur principal
        this.pokemonContainer.appendChild(card);
      } catch (e) {
        console.error(`Erreur lors de la création de la carte pour le Pokémon ${pokemon.id}:`, e);
      }
    });
  }

  // Méthode pour ouvrir une popup avec les détails d'un Pokémon
  async openPokemonDetails(pokemonId) {
    try {
      // Trouver le Pokémon par son ID
      const pokemon = this.pokemons.find(p => p.id === pokemonId);
      if (!pokemon) throw new Error(`Pokémon non trouvé avec l'ID ${pokemonId}`);
      
      console.log("Affichage des détails pour:", pokemon);
      
      // Vider le contenu actuel de la popup
      this.popupContent.innerHTML = '';
      
      // Créer le conteneur principal des détails
      const detailsContainer = document.createElement('div');
      detailsContainer.classList.add('pokemon-details');
      
      // === SECTION 1: EN-TÊTE AVEC IMAGE ET INFORMATIONS DE BASE ===
      const header = document.createElement('div');
      header.classList.add('pokemon-details-header');
      
      // Image du Pokémon
      const image = document.createElement('img');
      image.src = pokemon.image;
      image.alt = pokemon.name;
      image.onerror = function() {
        this.onerror = null;
        this.src = "/image/inconnu.png";
      };
      
      // Informations de base (nom, ID)
      const basicInfo = document.createElement('div');
      basicInfo.classList.add('pokemon-basic-info');
      
      const name = document.createElement('h2');
      name.textContent = pokemon.name;
      
      const id = document.createElement('p');
      id.classList.add('pokemon-id');
      id.textContent = `#${pokemon.pokedexId || pokemon.id}`;
      
      basicInfo.appendChild(name);
      basicInfo.appendChild(id);
      
      // Informations générales (génération, types)
      const generalInfo = document.createElement('div');
      generalInfo.classList.add('pokemon-general-info');
      
      // Ajouter la génération si disponible
      if (pokemon.apiGeneration) {
        const generation = document.createElement('p');
        generation.innerHTML = `<strong>Génération:</strong> ${pokemon.apiGeneration}`;
        generalInfo.appendChild(generation);
      }
      
      // Conteneur pour les types
      const typesContainer = document.createElement('div');
      typesContainer.classList.add('pokemon-types', 'detail-types');
      
      const typesLabel = document.createElement('p');
      typesLabel.innerHTML = '<strong>Types:</strong>';
      typesContainer.appendChild(typesLabel);
      
      const typesList = document.createElement('div');
      typesList.classList.add('types-container');
      
      // Ajouter chaque type du Pokémon
      if (pokemon.apiTypes && pokemon.apiTypes.length > 0) {
        pokemon.apiTypes.forEach(typeData => {
          const typeSpan = document.createElement('span');
          const typeName = typeData.name ? typeData.name.toLowerCase() : '';
          typeSpan.classList.add('pokemon-type', `type-${typeName}`);  // La même classe CSS est utilisée
          typeSpan.textContent = typeData.name;
          typesList.appendChild(typeSpan);
        });
      }
      
      // Assembler les éléments d'en-tête
      typesContainer.appendChild(typesList);
      generalInfo.appendChild(typesContainer);
      basicInfo.appendChild(generalInfo);
      header.appendChild(image);
      header.appendChild(basicInfo);
      detailsContainer.appendChild(header);
      
      // === SECTION 2: STATISTIQUES ===
      const statsSection = document.createElement('div');
      statsSection.classList.add('pokemon-stats');
      
      const statsTitle = document.createElement('h3');
      statsTitle.textContent = 'Statistiques';
      statsSection.appendChild(statsTitle);
      
      const statsList = document.createElement('ul');
      
      // Créer une barre de statistique pour chaque attribut
      if (pokemon.stats) {
        const stats = [
          { name: 'PV', value: pokemon.stats.HP },
          { name: 'Attaque', value: pokemon.stats.attack },
          { name: 'Défense', value: pokemon.stats.defense },
          { name: 'Attaque Spé.', value: pokemon.stats.special_attack },
          { name: 'Défense Spé.', value: pokemon.stats.special_defense },
          { name: 'Vitesse', value: pokemon.stats.speed }
        ];
        
        // Créer un élément pour chaque statistique
        stats.forEach(stat => {
          const statItem = document.createElement('li');
          statItem.innerHTML = `<span class="stat-name">${stat.name}:</span> <span class="stat-value">${stat.value}</span>
                               <div class="stat-bar"><div class="stat-fill" style="width: ${stat.value / 2}%;"></div></div>`;
          statsList.appendChild(statItem);
        });
      }
      
      statsSection.appendChild(statsList);
      detailsContainer.appendChild(statsSection);
      
      // === SECTION 3: RÉSISTANCES ET FAIBLESSES ===
      if (pokemon.apiResistances && pokemon.apiResistances.length > 0) {
        const resistancesSection = document.createElement('div');
        resistancesSection.classList.add('pokemon-resistances-weaknesses');
        
        const resistancesTitle = document.createElement('h3');
        resistancesTitle.textContent = 'Résistances & Faiblesses';
        resistancesSection.appendChild(resistancesTitle);
        
        const resistancesContainer = document.createElement('div');
        resistancesContainer.classList.add('resistances-weaknesses-container');
        
        // Conteneur pour les résistances
        const resistances = document.createElement('div');
        resistances.classList.add('resistances');
        const resistancesLabel = document.createElement('h4');
        resistancesLabel.textContent = 'Résistances:';
        resistances.appendChild(resistancesLabel);
        
        const resistancesList = document.createElement('div');
        resistancesList.classList.add('type-list');
        
        // Conteneur pour les faiblesses
        const weaknesses = document.createElement('div');
        weaknesses.classList.add('weaknesses');
        const weaknessesLabel = document.createElement('h4');
        weaknessesLabel.textContent = 'Faiblesses:';
        weaknesses.appendChild(weaknessesLabel);
        
        const weaknessesList = document.createElement('div');
        weaknessesList.classList.add('type-list');
        
        // Conteneur pour les types neutres
        const neutral = document.createElement('div');
        neutral.classList.add('neutral');
        const neutralLabel = document.createElement('h4');
        neutralLabel.textContent = 'Neutre:';
        neutral.appendChild(neutralLabel);
        
        const neutralList = document.createElement('div');
        neutralList.classList.add('type-list');
        
        // Classer chaque relation de type dans la catégorie appropriée
        pokemon.apiResistances.forEach(resistance => {
          const relationItem = document.createElement('div');
          
          // Créer l'icône du type
          const typeSpan = document.createElement('span');
          typeSpan.classList.add('pokemon-type', `type-${resistance.name.toLowerCase()}`);  // Même approche
          typeSpan.textContent = resistance.name;
          
          // Afficher le multiplicateur de dégâts
          const multiplier = document.createElement('span');
          multiplier.classList.add('multiplier');
          multiplier.textContent = `x${resistance.damage_multiplier}`;
          
          relationItem.appendChild(typeSpan);
          relationItem.appendChild(multiplier);
          
          // Classer selon la relation de dégâts
          if (resistance.damage_relation === "resistant" || resistance.damage_relation === "twice_resistant") {
            relationItem.classList.add('resistance-item');
            resistancesList.appendChild(relationItem);
          } 
          else if (resistance.damage_relation === "vulnerable") {
            relationItem.classList.add('weakness-item');
            weaknessesList.appendChild(relationItem);
          }
          else {
            relationItem.classList.add('neutral-item');
            neutralList.appendChild(relationItem);
          }
        });
        
        // Ajouter les listes seulement si elles contiennent des éléments
        if (resistancesList.children.length > 0) {
          resistances.appendChild(resistancesList);
          resistancesContainer.appendChild(resistances);
        }
        
        if (weaknessesList.children.length > 0) {
          weaknesses.appendChild(weaknessesList);
          resistancesContainer.appendChild(weaknesses);
        }
        
        if (neutralList.children.length > 0) {
          neutral.appendChild(neutralList);
          resistancesContainer.appendChild(neutral);
        }
        
        resistancesSection.appendChild(resistancesContainer);
        detailsContainer.appendChild(resistancesSection);
      }
      
      // === SECTION 4: ÉVOLUTIONS ===
      if (pokemon.apiEvolutions && pokemon.apiEvolutions.length > 0 || pokemon.apiPreEvolution !== "none") {
        const evoSection = document.createElement('div');
        evoSection.classList.add('pokemon-evolution');
        
        const evoTitle = document.createElement('h3');
        evoTitle.textContent = 'Évolutions';
        evoSection.appendChild(evoTitle);
        
        const evoChain = document.createElement('div');
        evoChain.classList.add('evolution-chain');
        
        // Ajouter la pré-évolution si elle existe
        if (pokemon.apiPreEvolution !== "none") {
          const preEvolutionName = pokemon.apiPreEvolution;
          const preEvolution = this.pokemons.find(p => p.name === preEvolutionName);
          
          if (preEvolution) {
            // Créer l'élément de pré-évolution
            const preEvoElement = document.createElement('div');
            preEvoElement.classList.add('evolution-item');
            
            // Image de la pré-évolution
            const preEvoImg = document.createElement('img');
            preEvoImg.src = preEvolution.image;
            preEvoImg.alt = preEvolution.name;
            preEvoImg.onerror = function() {
              this.onerror = null;
              this.src = "/image/inconnu.png";
            };
            
            // Nom et numéro de la pré-évolution
            const preEvoName = document.createElement('p');
            preEvoName.textContent = preEvolution.name;
            
            const preEvoNum = document.createElement('small');
            preEvoNum.textContent = `#${preEvolution.pokedexId || preEvolution.id}`;
            
            // Assembler l'élément de pré-évolution
            preEvoElement.appendChild(preEvoImg);
            preEvoElement.appendChild(preEvoName);
            preEvoElement.appendChild(preEvoNum);
            
            // Ajouter un gestionnaire d'événement pour naviguer vers la pré-évolution
            preEvoElement.addEventListener('click', () => this.openPokemonDetails(preEvolution.id));
            
            evoChain.appendChild(preEvoElement);
            
            // Ajouter une flèche
            const arrow = document.createElement('div');
            arrow.classList.add('evolution-arrow');
            arrow.textContent = '→';
            evoChain.appendChild(arrow);
          }
        }
        
        // Ajouter le Pokémon actuel dans la chaîne d'évolution
        const currentEvo = document.createElement('div');
        currentEvo.classList.add('evolution-item', 'current-evolution');
        
        const currentEvoImg = document.createElement('img');
        currentEvoImg.src = pokemon.image;
        currentEvoImg.alt = pokemon.name;
        
        const currentEvoName = document.createElement('p');
        currentEvoName.textContent = pokemon.name;
        
        const currentEvoNum = document.createElement('small');
        currentEvoNum.textContent = `#${pokemon.pokedexId || pokemon.id}`;
        
        currentEvo.appendChild(currentEvoImg);
        currentEvo.appendChild(currentEvoName);
        currentEvo.appendChild(currentEvoNum);
        evoChain.appendChild(currentEvo);
        
        // Ajouter les évolutions suivantes si elles existent
        if (pokemon.apiEvolutions && pokemon.apiEvolutions.length > 0) {
          // Ajouter une flèche vers l'évolution
          const arrow = document.createElement('div');
          arrow.classList.add('evolution-arrow');
          arrow.textContent = '→';
          evoChain.appendChild(arrow);
          
          // Parcourir chaque évolution
          pokemon.apiEvolutions.forEach(evolution => {
            const nextEvolution = this.pokemons.find(p => p.name === evolution.name);
            
            if (nextEvolution) {
              // Créer l'élément d'évolution
              const nextEvoElement = document.createElement('div');
              nextEvoElement.classList.add('evolution-item');
              
              // Image de l'évolution
              const nextEvoImg = document.createElement('img');
              nextEvoImg.src = nextEvolution.image;
              nextEvoImg.alt = nextEvolution.name;
              nextEvoImg.onerror = function() {
                this.onerror = null;
                this.src = "/image/inconnu.png";
              };
              
              // Nom et numéro de l'évolution
              const nextEvoName = document.createElement('p');
              nextEvoName.textContent = nextEvolution.name;
              
              const nextEvoNum = document.createElement('small');
              nextEvoNum.textContent = `#${evolution.pokedexId || nextEvolution.id}`;
              
              // Assembler l'élément d'évolution
              nextEvoElement.appendChild(nextEvoImg);
              nextEvoElement.appendChild(nextEvoName);
              nextEvoElement.appendChild(nextEvoNum);
              
              // Ajouter un gestionnaire d'événement pour naviguer vers cette évolution
              nextEvoElement.addEventListener('click', () => this.openPokemonDetails(nextEvolution.id));
              
              evoChain.appendChild(nextEvoElement);
            }
          });
        }
        
        evoSection.appendChild(evoChain);
        detailsContainer.appendChild(evoSection);
      }
      
      // Ajouter tous les détails à la popup et l'afficher
      this.popupContent.appendChild(detailsContainer);
      this.popup.style.display = 'flex';
      
    } catch (error) {
      // Gérer les erreurs
      console.error('Erreur lors du chargement des détails du Pokémon:', error);
      this.popupContent.innerHTML = `<div class="error-message">Impossible de charger les détails: ${error.message}</div>`;
      this.popup.style.display = 'flex';
    }
  }

  // Méthode pour fermer la popup
  closePopup() {
    this.popup.style.display = 'none';
  }
}

// Initialiser le gestionnaire de Pokémons quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  const pokemonManager = new PokemonManager();
  pokemonManager.fetchPokemons();
});