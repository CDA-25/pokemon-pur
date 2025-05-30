document.addEventListener('DOMContentLoaded', () => {
  const boutonRetour = document.getElementById('btnRetour');
  if (boutonRetour) {
    boutonRetour.addEventListener('click', () => {
      window.history.back(); // Retourne à la page précédente (repertoire.html)
    });
  }

  const sectionDetail = document.getElementById('detailPokemon');
  const pokemon = JSON.parse(localStorage.getItem('pokemonSelectionne'));

  if (!pokemon) {
    sectionDetail.innerHTML = '<p>Aucun pokémon sélectionné.</p>';
    return;
  }

  const titre = document.createElement('h2');
  titre.textContent = pokemon.name?.fr || pokemon.name || 'Nom inconnu';

  const image = document.createElement('img');
  image.src = pokemon.image;
  image.alt = pokemon.name?.fr;

  const infos = document.createElement('p');
  infos.textContent = `Type : ${pokemon.apiTypes?.map(t => t.name).join(', ')}`;

  sectionDetail.appendChild(titre);
  sectionDetail.appendChild(image);
  sectionDetail.appendChild(infos);
});