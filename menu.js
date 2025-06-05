/* Commentaire genere pour pablo */
/*
 * Gestionnaire de menu pour la page Pokédex
 * Ce fichier contient la classe MenuManager qui gère:
 * - La création d'un menu de filtrage par types de Pokémon
 * - La création d'une barre de recherche pour filtrer les Pokémons par nom ou id
 * - L'application des filtres sur la liste des Pokémons affichés
 */

class MenuManager {
  // Constructeur initialisant les propriétés et les données des types
  constructor() {
    // Récupérer le conteneur du menu
    this.menuContainer = document.getElementById('menu-container');
    
    // Liste des types de Pokémon avec leurs icônes
    this.menuItems = [
      { name: 'Feu', logo: '/logo/Fire.png' },
      { name: 'Eau', logo: './logo/Water.png' },
      { name: 'Plante', logo: './logo/Grass.png' },
      { name: 'Électrik', logo: './logo/Electric.png' },
      { name: 'Glace', logo: './logo/Ice.png' },
      { name: 'Roche', logo: './logo/Rock.png' },
      { name: 'Sol', logo: './logo/Ground.png' },
      { name: 'Vol', logo: './logo/Flying.png' },
      { name: 'Insecte', logo: './logo/Bug.png' },
      { name: 'Spectre', logo: './logo/Ghost.png' },
      { name: 'Acier', logo: './logo/Steel.png' },
      { name: 'Combat', logo: './logo/Fighting.png' },
      { name: 'Psy', logo: './logo/Psychic.png' },
      { name: 'Ténèbres', logo: './logo/Dark.png' },
      { name: 'Dragon', logo: './logo/Dragon.png' },
      { name: 'Fée', logo: './logo/Fairy.png' },
      { name: 'Poison', logo: './logo/Poison.png' },
      { name: 'Normal', logo: './logo/Normal.png' },
    ];
    
    // Créer la structure du menu
    this.createMenuLayout();
  }

  // Méthode pour créer la structure du menu
  createMenuLayout() {
    // Créer le conteneur pour le menu des types
    this.typeMenuContainer = document.createElement('div');
    this.typeMenuContainer.id = 'type-menu-container';
    this.menuContainer.appendChild(this.typeMenuContainer);
    
    // Créer le conteneur pour la barre de recherche
    this.searchBarContainer = document.createElement('div');
    this.searchBarContainer.id = 'search-bar-container';
    this.menuContainer.appendChild(this.searchBarContainer);
    
    // Créer les éléments du menu
    this.createTypeMenu();
    this.createSearchBar();
  }

  // Méthode pour créer le menu de filtrage par type
  createTypeMenu() {
    // Créer le wrapper pour le menu des types
    const menuWrapper = document.createElement('div');
    menuWrapper.classList.add('type-menu-wrapper');
    
    // Ajouter un bouton "Tous" pour afficher tous les Pokémon
    const allButton = document.createElement('div');
    allButton.classList.add('menu-item');
    allButton.innerHTML = '<span>Tous</span>';
    allButton.addEventListener('click', () => {
      // Afficher toutes les cartes Pokémon
      document.querySelectorAll('.pokemon-card').forEach(card => {
        card.style.display = 'block';
      });
    });
    menuWrapper.appendChild(allButton);
    
    // Ajouter un bouton pour chaque type de Pokémon
    this.menuItems.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.classList.add('menu-item');
      
      // Créer l'image du type
      const img = document.createElement('img');
      img.src = item.logo;
      img.alt = item.name;
      img.onerror = function() {
        // Masquer l'image si elle ne charge pas
        this.style.display = 'none';
      };
      
      // Créer le texte du type
      const span = document.createElement('span');
      span.textContent = item.name;
      
      // Assembler l'élément du menu
      menuItem.appendChild(img);
      menuItem.appendChild(span);
      menuWrapper.appendChild(menuItem);
      
      // Ajouter l'événement de filtrage par type
      menuItem.addEventListener('click', () => {
        const pokemonCards = document.querySelectorAll('.pokemon-card');
        const typeName = item.name;
        
        // Filtrer les cartes en fonction du type
        pokemonCards.forEach(card => {
          if (card.dataset.types) {
            const types = card.dataset.types.split(',');
            card.style.display = types.includes(typeName) ? 'block' : 'none';
          }
        });
      });
    });
    
    // Ajouter le menu des types au conteneur
    this.typeMenuContainer.appendChild(menuWrapper);
  }

  // Méthode pour créer la barre de recherche
  createSearchBar() {
    // Créer le conteneur de la barre de recherche
    const searchContainer = document.createElement('div');
    searchContainer.classList.add('search-container');
    
    // Créer l'input de recherche
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'search-pokemon';
    searchInput.placeholder = 'Rechercher un Pokémon...';
    searchInput.classList.add('search-input');
    
    // Ajouter l'événement de recherche sur la saisie
    searchInput.addEventListener('input', () => this.filterPokemon(searchInput.value));
    
    // Assembler la barre de recherche
    searchContainer.appendChild(searchInput);
    this.searchBarContainer.appendChild(searchContainer);
  }

  // Méthode pour filtrer les Pokémons en fonction du terme de recherche
  filterPokemon(searchTerm) {
    const pokemonCards = document.querySelectorAll('.pokemon-card');
    searchTerm = searchTerm.toLowerCase();
    
    // Parcourir toutes les cartes et filtrer par nom ou ID
    pokemonCards.forEach(card => {
      const pokemonName = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const pokemonId = card.querySelector('p')?.textContent.toLowerCase() || '';
      
      // Afficher ou masquer les cartes selon la recherche
      if (pokemonName.includes(searchTerm) || pokemonId.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
}

// Initialiser le gestionnaire de menu quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  const menuManager = new MenuManager();
});
