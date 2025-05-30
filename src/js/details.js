window.addEventListener('load', async () => {

  const boutonRetour = document.getElementById('btnRetour');
  if (boutonRetour) {
    boutonRetour.addEventListener('click', () => {
      window.history.back()
    });
  }
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id')

  if (!id) {
    console.error("Aucun ID trouvé dans l'URL")
    return
  }

  try {
    const res = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${id}`)
    const pokemon = await res.json()

    // Ajoute les infos au DOM :
    document.querySelector('#pokemonName').textContent = `#${pokemon.id} ${pokemon.name}`
    document.querySelector('#pokemonImage').src = pokemon.image
    document.querySelector('#pokemonTypes').textContent = pokemon.apiTypes.map(t => t.name).join(', ')

  } catch (error) {
    console.error("Erreur de récupération du Pokémon :", error)
  }
});