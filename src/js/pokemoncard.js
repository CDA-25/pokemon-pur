import Tool from './toolbox.js'
import Pokemon from './pokemon.js'
import { getTypeColor } from './getTypeColor.js'

const urlParams = new URLSearchParams(window.location.search)
const pokemonId = urlParams.get('id')

const loadPokemonData = async () => {
  const data = await new Tool().getPokemon()
  const pkmnData = data.find(pkmn => String(pkmn.pokedexId) === pokemonId)
  const pokemon = new Pokemon(pkmnData)

  displayPokemonDetails(pokemon)
}

function displayPokemonDetails(pokemon) {
    const mainType = pokemon.types[0].name

    const wrapper = new Tool()
    .createElement('div')
    .class('page')
    .appendTo(document.body)
    .element

    const container = new Tool()
    .createElement('div')
    .class('pokemonDetails')
    .appendTo(wrapper)
    .element
    container.style.setProperty('--bg-color', getTypeColor(mainType))


  new Tool()
    .createElement('h1')
    .textContent(`${pokemon.name} (#${pokemon.pokedexId})`)
    .appendTo(container)

  new Tool()
    .createElement('img')
    .src(pokemon.image)
    .alt(pokemon.name)
    .class('pokemonImage')
    .appendTo(container)

  const stats = new Tool()
    .createElement('ul')
    .class('pokemonStats')
    .appendTo(container)
    .element

  const statEntries = [
    ['PV', pokemon.hp],
    ['Attaque', pokemon.attack],
    ['Défense', pokemon.defense],
    ['Attaque Spéciale', pokemon.special_attack],
    ['Défense Spéciale', pokemon.special_defense],
    ['Vitesse', pokemon.speed],
  ]

  statEntries.forEach(([label, value]) => {
    const li = new Tool().createElement('li').appendTo(stats).element
    li.textContent = `${label} : ${value}`
  })
}

console.log(loadPokemonData())
