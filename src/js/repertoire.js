import ServicePokemon from './services/ServicePokemon.js';
import CartePokemon from '/src/js/composant/CartesPokemon.js';

document.addEventListener('DOMContentLoaded', async () => {
  const conteneur = document.querySelector('.contenuCartes');
  const barreRecherche = document.querySelector('.recherche');

  const service = new ServicePokemon();
  const tousLesPokemons = await service.recupererPokemons();

  const afficherPokemons = (liste) => {
    conteneur.innerHTML = '';
    liste.forEach(pokemon => {
      const carte = new CartePokemon(pokemon);
      conteneur.appendChild(carte.creerElement());
    });
  };

  afficherPokemons(tousLesPokemons);

  barreRecherche.addEventListener('input', () => {
    const valeur = barreRecherche.value.toLowerCase();
    const filtres = tousLesPokemons.filter(p => 
      p.name.toLowerCase().startsWith(valeur) || 
      p.id.toString().startsWith(valeur) ||          
      p.apiTypes.some(t => t.name.toLowerCase().startsWith(valeur)) 
    );
    afficherPokemons(filtres);
  });
});
