import ServicePokemon from './services/ServicePokemon.js';

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const conteneur = document.querySelector('.detailsPokemon');
  const boutonRetour = document.querySelector('.boutonRetour');

  const service = new ServicePokemon();
  const pokemon = await service.recupererPokemonParId(id);

  conteneur.innerHTML = `
    <h1>${pokemon.name.fr}</h1>
    <img src="${pokemon.image}" alt="${pokemon.name.fr}">
    <p><strong>Type(s):</strong> ${pokemon.apiTypes.map(t => t.name).join(', ')}</p>
    <p><strong>Description:</strong> ${pokemon.apiGeneration.name}</p>
    <p><strong>Stats:</strong></p>
    <ul>
      ${Object.entries(pokemon.stats).map(([key, val]) => `<li>${key} : ${val}</li>`).join('')}
    </ul>
  `;

  boutonRetour.addEventListener('click', () => {
    window.location.href = 'repertoire.html';
  });
});
