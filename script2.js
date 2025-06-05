// Faut découper pour faire des require
// const { blabla } = require('blabla');

async function pokemonData(/*params*/) {
  const url = 'https://pokebuildapi.fr/api/v1/pokemon';

  try {
    const response = await fetch(url/*, { method: 'GET' }*/);
    if (!response.ok) {
      throw new Error(`Erreur : ${response.status}`);
    }
    const data = await response.json();
    //console.log(data);

    const tabPokemons = [];

    data.forEach((element) => {
      const pokemonName = element.name;
      const pokemonImage = element.image;
      const pokemonHP = element.stats.HP;
      const pokemonAttack = element.stats.attack;
      const pokemonDefense = element.stats.defense;
      const pokemonSpeAtt = element.stats.special_attack;
      const pokemonSpeDef = element.stats.special_defense;
      const pokemonSpeed = element.stats.speed;

  
      
      const newPoke = new Pokemon(
        pokemonName,
        pokemonImage,
        pokemonHP,
        pokemonAttack,
        pokemonDefense,
        pokemonSpeAtt,
        pokemonSpeDef,
        pokemonSpeed
      );
      tabPokemons.push(newPoke);

      // Créer une div pour le pokemon
      const newPokeDiv = document.createElement('div');
      newPokeDiv.classList.add("bg-white", "rounded-2xl", "shadow-lg", "border", "border-amber-300", "p-4","m-2");
      
      const pokemonH2 = document.createElement('h2');
      pokemonH2.className = 'text-xl font-bold text-center text-gray-800 mb-2';
      pokemonH2.textContent = `${pokemonName}`;
      newPokeDiv.appendChild(pokemonH2);

      const container = document.querySelector('#pokemons_container');
      container.appendChild(newPokeDiv);

      // Pour l'image dans la div
      const imgPokemon = document.createElement('img');
      imgPokemon.src = pokemonImage;
      imgPokemon.alt = `${pokemonName}`;
      imgPokemon.className = 'w-28 h-28 mx-auto mb-4';
      newPokeDiv.appendChild(imgPokemon);

      // Pour l'HP
      const paragrapheHP = document.createElement('p');
      paragrapheHP.textContent = `HP : ${pokemonHP}`;
      paragrapheHP.className = "flex justify-between col-span-2 font-semibold";
      newPokeDiv.appendChild(paragrapheHP);

      // Pour l'Attaque
      const paragrapheAtt = document.createElement('p');
      paragrapheAtt.textContent = `Attaque : ${pokemonAttack}`;
      paragrapheHP.className = "flex justify-between col-span-2 font-semibold";
      newPokeDiv.appendChild(paragrapheAtt);

      // Pour la défense
      const paragrapheDef = document.createElement('p');
      paragrapheDef.textContent = `Defense : ${pokemonDefense}`;
      paragrapheHP.className = "flex justify-between col-span-2 font-semibold";
      newPokeDiv.appendChild(paragrapheDef);

      // Pour l'Attaque Spéciale
      const paragrapheSpeAtt = document.createElement('p');
      paragrapheSpeAtt.textContent = `Attaque Spéciale: ${pokemonSpeAtt}`;
      paragrapheHP.className = "flex justify-between col-span-2 font-semibold";
      newPokeDiv.appendChild(paragrapheSpeAtt);

      // Pour la Défense Spéciale
      const paragrapheSpeDef = document.createElement('p');
      paragrapheSpeDef.textContent = `Defense Spéciale: ${pokemonSpeDef}`;
      paragrapheHP.className = "flex justify-between col-span-2 font-semibold";
      newPokeDiv.appendChild(paragrapheSpeDef);

      // Pour la Vitesse
      const paragrapheSpeed = document.createElement('p');
      paragrapheSpeed.textContent = `Vitesse : ${pokemonSpeed}`;
      paragrapheHP.className = "flex justify-between col-span-2 font-semibold";
      newPokeDiv.appendChild(paragrapheSpeed);

    });
  } catch (err) {
    console.error(err.message);
  }
}


class Pokemon {
        constructor(
          name,
          image,
          hp,
          attack,
          defense,
          special_attack,
          special_defense,
          speed
        ) {
          this.name = name;
          this.image = image;
          this.hp = hp;
          this.attack = attack;
          this.defense = defense;
          this.special_attack = special_attack;
          this.special_defense = special_defense;
          this.speed = speed;
        }
      }

pokemonData();
