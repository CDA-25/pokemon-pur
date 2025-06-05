> Ce document a été généré avec l'aide de Claude, un assistant IA d'Anthropic.

# Pokedex Interactive


## Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Fonctionnalités](#fonctionnalités)
3. [Structure du projet](#structure-du-projet)
4. [Pages](#pages)
    - [Page d'accueil](#page-daccueil)
    - [Pokédex complet](#pokédex-complet)
    - [Pokémon par génération](#pokémon-par-génération)
5. [Composants principaux](#composants-principaux)
    - [API Pokémon](#api-pokémon)
    - [Gestionnaire de Pokémon](#gestionnaire-de-pokémon)
    - [Menu et filtres](#menu-et-filtres)
    - [Affichage par génération](#affichage-par-génération)
6. [Fonctionnement technique](#fonctionnement-technique)
7. [Installation et déploiement](#installation-et-déploiement)
8. [Ressources](#ressources)

## Vue d'ensemble

L'application Pokedex Interactive est une interface web permettant d'explorer l'univers des Pokémon. Elle utilise l'API [PokeBuild](https://pokebuildapi.fr) pour récupérer les données de tous les Pokémon et les présenter de manière interactive et conviviale.

Cette application web a été construite en HTML, CSS et JavaScript vanilla (sans framework). Elle met l'accent sur l'interaction utilisateur et propose différentes façons de parcourir et filtrer les Pokémon.


## Fonctionnalités

- **Vue d'ensemble des Pokémon** : Affichage de tous les Pokémon dans une grille avec leurs images, noms et types
- **Détails complets** : Consulter les statistiques détaillées, les résistances et faiblesses de chaque Pokémon
- **Recherche et filtrage** : Rechercher des Pokémon par nom ou filtrer par type
- **Vue par génération** : Afficher uniquement les Pokémon d'une génération spécifique
- **Chaîne d'évolution** : Voir les évolutions et pré-évolutions de chaque Pokémon
- **Interface responsive** : Adaptée à tous les appareils, des mobiles aux ordinateurs de bureau

## Structure du projet

```
/7Exo-class/
├── index.html          # Page d'accueil
├── liste.html          # Page Pokédex complet
├── generation.html     # Page de filtrage par génération
├── asyncAwait.js       # Gestionnaire principal des Pokémon
├── menu.js             # Gestionnaire du menu et des filtres
├── generation.js       # Gestionnaire de l'affichage par génération
├── rechercher.js       # Utilitaire de recherche
├── detail.js           # Utilitaire pour les détails
├── styles.css          # Styles CSS pour toutes les pages
└── /image/             # Dossier contenant les images
    ├── banniere.png
    └── pokeball 2.png
└── /logo/              # Dossier contenant les logos des types
    ├── Fire.png
    ├── Water.png
    └── ...
```

## Pages

### Page d'accueil

La page d'accueil (`index.html`) présente une interface minimaliste avec une animation de Pokeball qui tourne. Elle sert de point d'entrée vers les autres fonctionnalités de l'application.

**Caractéristiques :**
- Animation CSS d'une Pokeball en rotation
- Navigation vers les autres sections de l'application
- Design épuré et accueillant


### Pokédex complet

La page du Pokédex complet (`liste.html`) affiche tous les Pokémon disponibles avec options de filtrage et de recherche.

**Caractéristiques :**
- Affichage de tous les Pokémon en grille
- Filtrage par type de Pokémon
- Barre de recherche pour trouver un Pokémon par nom ou ID
- Popup détaillé pour chaque Pokémon avec statistiques, types, évolutions, etc.


### Pokémon par génération

La page de génération (`generation.html`) permet de filtrer les Pokémon par génération de jeux.

**Caractéristiques :**
- Boutons de sélection pour chaque génération
- Affichage des Pokémon spécifiques à la génération sélectionnée
- Affichage des ID, noms et types


## Composants principaux

### API Pokémon

L'application utilise l'API [PokeBuild](https://pokebuildapi.fr/api/v1/pokemon) pour récupérer les données des Pokémon. Cette API fournit:
- Informations de base (nom, ID, image)
- Types et génération
- Statistiques (PV, Attaque, Défense, etc.)
- Résistances et faiblesses
- Informations sur les évolutions

### Gestionnaire de Pokémon

Le fichier `asyncAwait.js` contient la classe `PokemonManager` qui gère:
1. La récupération des données depuis l'API via `fetch`
2. L'affichage des cartes Pokémon dans la grille
3. La génération dynamique de popup détaillés pour chaque Pokémon

```javascript
// Extrait de code pour récupérer les données
async fetchPokemons() {
  try {
    console.log("Récupération des données de tous les Pokémon...");
    const response = await fetch('https://pokebuildapi.fr/api/v1/pokemon');
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    this.pokemons = await response.json();
    this.displayPokemons();
  } catch (error) {
    console.error('Erreur lors du chargement des Pokémon:', error);
    this.pokemonContainer.innerHTML = `<div class="error-message">Impossible de charger les données: ${error.message}</div>`;
  }
}
```

### Menu et filtres

Le fichier `menu.js` contient la classe `MenuManager` qui:
1. Crée dynamiquement un menu de types de Pokémon
2. Implémente une barre de recherche fonctionnelle
3. Gère les événements de clic pour le filtrage

```javascript
// Extrait de code pour le filtrage par type
menuItem.addEventListener('click', () => {
  const pokemonCards = document.querySelectorAll('.pokemon-card');
  const typeName = item.name;
  
  pokemonCards.forEach(card => {
    if (card.dataset.types) {
      const types = card.dataset.types.split(',');
      card.style.display = types.includes(typeName) ? 'block' : 'none';
    }
  });
});
```

### Affichage par génération

Le fichier `generation.js` contient la classe `GenerationManager` qui:
1. Définit les plages d'ID pour chaque génération de Pokémon
2. Crée des boutons de sélection pour chaque génération
3. Filtre et affiche les Pokémon de la génération sélectionnée

```javascript
// Extrait de code pour le filtrage par génération
displayPokemonsByGeneration(genId) {
  const generation = this.generations.find(gen => gen.id === genId);
  if (!generation) {
    return;
  }
  
  const genPokemons = this.pokemons.filter(pokemon => 
    pokemon.id >= generation.range[0] && 
    pokemon.id <= generation.range[1]
  );
  
  // Affichage des Pokémon filtrés...
}
```

## Fonctionnement technique

L'application fonctionne selon les principes suivants:

1. **Chargement asynchrone des données** : Utilisation de `async/await` pour récupérer les données depuis l'API
2. **Manipulation du DOM** : Création dynamique des éléments HTML pour afficher les Pokémon
3. **Gestion d'événements** : Écouteurs d'événements pour les clics, recherche, et autres interactions
4. **Filtrage dynamique** : Filtrage des Pokémon sans rechargement de page

Exemple de la structure d'un Pokémon retourné par l'API:

```javascript
{
  id: 25,
  pokedexId: 25,
  name: "Pikachu",
  image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  stats: { HP: 35, attack: 55, defense: 40, special_attack: 50, special_defense: 50, speed: 90 },
  apiTypes: [{ name: "Électrik", image: "https://pokebuildapi.fr/images/types/Électrik.png" }],
  apiGeneration: 1,
  apiResistances: [
    { name: "Électrik", damage_multiplier: 0.5, damage_relation: "resistant" },
    { name: "Vol", damage_multiplier: 2, damage_relation: "vulnerable" },
    // ...autres résistances
  ],
  apiEvolutions: [
    { name: "Raichu", pokedexId: 26 }
  ],
  apiPreEvolution: "Pichu"
}
```

## Installation et déploiement

1. **Clonage du projet**:
   ```bash
   git clone https://github.com/votre-utilisateur/pokedex-interactive.git
   cd pokedex-interactive
   ```

2. **Lancement local**:
   Vous pouvez simplement ouvrir les fichiers HTML dans un navigateur ou utiliser un serveur local:
   ```bash
   # Avec Python
   python -m http.server 8000
   
   # Ou avec Node.js
   npx serve
   ```

3. **Hébergement**:
   L'application peut être déployée sur n'importe quel hébergeur statique comme GitHub Pages, Netlify, ou Vercel.

## Ressources

- [API PokeBuild](https://pokebuildapi.fr) - Source des données Pokémon
- [Images officielles des Pokémon](https://raw.githubusercontent.com/PokeAPI/sprites/) - Source des illustrations
- [MDN Web Docs](https://developer.mozilla.org/) - Documentation de référence pour JavaScript et les API Web
- [Icônes des types Pokémon](https://github.com/duiker101/pokemon-type-svg-icons) - Icônes utilisées pour les types

---

© 2023 Le Repaire des Dresseurs - Créé pour la formation JavaScript au Numérica
