window.addEventListener('load', async () => {
  const boutonRetour = document.getElementById('btnRetour');
  if (boutonRetour) {
    boutonRetour.addEventListener('click', () => {
      window.history.back()
    });
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    console.error("Aucun ID trouvé dans l'URL");
    return;
  }

  try {
    const res = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${id}`);
    const pokemon = await res.json();

    document.querySelector('#pokemonName').textContent = `#${pokemon.id} ${pokemon.name}`;
    document.querySelector('#pokemonImage').src = pokemon.image;
    document.querySelector('#pokemonTypes').textContent = pokemon.apiTypes.map(t => t.name).join(', ');

    const groupedByRelation = pokemon.apiResistances.reduce((acc, res) => {
      if (!acc[res.damage_relation]) acc[res.damage_relation] = [];
      acc[res.damage_relation].push(res);
      return acc;
    }, {});

    const container = document.querySelector('#pokemonRes');
    container.textContent = '';

    for (const relation in groupedByRelation) {
      if (relation.toLowerCase() === 'neutral') continue;
      const section = document.createElement('div');
      // Titre du groupe
      const titre = document.createElement('h3');
      titre.textContent = relation.toUpperCase();
      section.appendChild(titre);

      groupedByRelation[relation].forEach(r => {
        const p = document.createElement('p');
        p.textContent = `Nom : ${r.name} | Multiplicateur : ${r.damage_multiplier}`;
        section.appendChild(p);
      });

      container.appendChild(section);
    }

  } catch (error) {
    console.error("Erreur de récupération du Pokémon :", error);
  }
});