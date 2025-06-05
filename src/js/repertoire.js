import ServicePokemon from "./services/ServicePokemon.js";
import CartePokemon from "/src/js/composant/CartesPokemon.js";

document.addEventListener("DOMContentLoaded", async () => {
  const conteneur = document.querySelector(".contenuCartes");

  const inputNom = document.getElementById("searchNom");
  const inputType = document.getElementById("searchType");
  const inputId = document.getElementById("searchId");
  const inputGen = document.getElementById("searchGen");

  const service = new ServicePokemon();
  const tousLesPokemons = await service.recupererPokemons();

  const afficherPokemons = (liste) => {
    conteneur.textContent = "";
    liste.forEach((pokemon) => {
      const carte = new CartePokemon(pokemon);
      conteneur.appendChild(carte.creerElement());
    });
  };

  afficherPokemons(tousLesPokemons);

  function filtrerPokemons() {
    const valNom = inputNom.value.trim().toLowerCase();
    const valType = inputType.value.trim().toLowerCase();
    const valId = inputId.value.trim();
    const valGen = inputGen.value.trim();

    const filtres = tousLesPokemons.filter((pokemon) => {
      const matchNom =
        valNom === "" || pokemon.name.toLowerCase().startsWith(valNom);
      const matchType =
        valType === "" ||
        pokemon.apiTypes.some((t) => t.name.toLowerCase().startsWith(valType));
      const matchId = valId === "" || pokemon.id.toString().startsWith(valId);
      const matchGen =
        valGen === "" ||
        (pokemon.apiGeneration && pokemon.apiGeneration.toString() === valGen);

      return matchNom && matchType && matchId && matchGen;
    });

    afficherPokemons(filtres);
  }

  [inputNom, inputType, inputId, inputGen].forEach((input) => {
    input.addEventListener("input", filtrerPokemons);
  });
});
