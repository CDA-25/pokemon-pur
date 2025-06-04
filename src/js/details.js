window.addEventListener('load', async () => {
  const boutonRetour = document.getElementById('btnRetour');
  boutonRetour?.addEventListener('click', () => window.history.back());

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return console.error("Aucun ID trouvé dans l'URL");

  try {
    const res = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${id}`);
    const pokemon = await res.json();

    document.querySelector('#pokemonName').textContent = `#${pokemon.id} ${pokemon.name}`;
    const image = document.querySelector('#pokemonImage');
    image.src = pokemon.image;
    image.alt = `Image de ${pokemon.name}`;

    document.querySelector('#pokemonTypes').textContent = pokemon.apiTypes.map(t => t.name).join(', ');
    document.querySelector('#pokemonStats').textContent = 
      `${pokemon.stats.HP} HP | ${pokemon.stats.attack} Atk | ${pokemon.stats.defense} Def | ` +
      `${pokemon.stats.special_attack} SpA | ${pokemon.stats.special_defense} SpD | ${pokemon.stats.speed} Spe`;

    document.querySelector('#pokemonGen').textContent = pokemon.apiGeneration;
    const preEvo = document.querySelector('#pokemonPreEvo');
preEvo.innerHTML = '';

if (pokemon.apiPreEvolution) {
  const preEvos = Array.isArray(pokemon.apiPreEvolution)
    ? pokemon.apiPreEvolution
    : [pokemon.apiPreEvolution];

  if (preEvos.length === 0 || !preEvos[0].name) {
    preEvo.textContent = 'Aucune';
  } else {
    for (const evo of preEvos) {
      try {
        const resPre = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${evo.name}`);
        const dataPre = await resPre.json();

        const lien = document.createElement('a');
        lien.href = `details.html?id=${dataPre.id}`;
        lien.style.display = 'flex';
        lien.style.alignItems = 'center';
        lien.style.gap = '10px';
        lien.style.marginBottom = '8px';

        const image = document.createElement('img');
        image.src = dataPre.image;
        image.alt = dataPre.name.fr;
        image.style.width = '60px';
        image.style.height = '60px';

        const nom = document.createElement('span');
        nom.textContent = dataPre.name.fr;

        lien.appendChild(image);
        lien.appendChild(nom);
        preEvo.appendChild(lien);
      } catch (err) {
        console.error('Erreur pré-évolution :', err);
      }
    }
  }
} else {
  preEvo.textContent = 'Aucune';
}


    const evoContainer = document.querySelector('#pokemonEvo');
evoContainer.innerHTML = '';

if (pokemon.apiEvolutions && pokemon.apiEvolutions.length > 0) {
  for (const evo of pokemon.apiEvolutions) {
    try {
      const resEvo = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${evo.name}`);
      const dataEvo = await resEvo.json();

      const lien = document.createElement('a');
      lien.href = `details.html?id=${dataEvo.id}`;
      lien.style.display = 'flex';
      lien.style.alignItems = 'center';
      lien.style.gap = '10px';
      lien.style.marginBottom = '8px';

      const image = document.createElement('img');
      image.src = dataEvo.image;
      image.alt = dataEvo.name.fr;
      image.style.width = '60px';
      image.style.height = '60px';

      const nom = document.createElement('span');
      nom.textContent = dataEvo.name.fr;

      lien.appendChild(image);
      lien.appendChild(nom);
      evoContainer.appendChild(lien);
    } catch (err) {
      console.error('Erreur évolution :', err);
    }
  }
} else {
  evoContainer.textContent = 'Aucune';
}


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
      const titre = document.createElement('p');
      titre.textContent = relation.toUpperCase();
      titre.classList.add('titreResistance');
      section.appendChild(titre);

      groupedByRelation[relation].forEach(r => {
        const p = document.createElement('p');
        p.textContent = `${r.name} (x${r.damage_multiplier})`;
        section.appendChild(p);
      });

      container.appendChild(section);
    }

  } catch (error) {
    console.error("Erreur de récupération du Pokémon :", error);
  }
});
