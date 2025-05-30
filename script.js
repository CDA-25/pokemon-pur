let types = [];
let evolution = [];
let preEvolution = [];
let stats = {};

class Pokemon {
  constructor(name, id, image, types, evolution, stats) {
    this.name = name;
    this.id = id;
    this.image = image;
    this.types = types;
    this.evolution = evolution;
    this.preEvolution = preEvolution;
    this.stats = stats;
  }
}

const getPokemonById = async (id) => {
  const res = await fetch("https://pokebuildapi.fr/api/v1/pokemon", {
    method: "GET",
  });
  let data = await res.json();
  let query = data.find((value) => value.id === id);

  if (query) {
    return query;
  } else {
    console.log("Aucun pokémon n'a été trouvé avec l'id " + id);
  }
};

getPokemonById(1); //Affiche le pokémon avec l'id correspondant

const displayAllPokemon = async (nb) => {
  const res = await fetch("https://pokebuildapi.fr/api/v1/pokemon", {
    method: "GET",
  });
  const data = await res.json();
  data.forEach((element) => {
    if (element.id <= nb) {
      console.log(element);
    }
  });
};

displayAllPokemon(10); // fonction doublon de getAllPokemon
