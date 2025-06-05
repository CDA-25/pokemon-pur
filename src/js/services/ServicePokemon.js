class ServicePokemon {
  constructor() {
    this.url = "https://pokebuildapi.fr/api/v1/pokemon";
  }

  async recupererPokemons() {
    const reponse = await fetch(this.url);
    return await reponse.json();
  }

  async recupererPokemonParId(id) {
    const reponse = await fetch(`${this.url}/${id}`);
    return await reponse.json();
  }
}

export default ServicePokemon;
