import Tool from './toolbox.js'
import Pokemon from './pokemon.js'
import { getTypeColor } from './getTypeColor.js'

const searchBar = new Tool()
      .createElement('input')
      .class('searchBar')
      .appendTo(document.body)
      .type('text')
      .placeholder('Cherche un pokémon, un type, une génération...')
      .element

const allCards = []

const container = new Tool()
      .createElement('div')
      .class('cardContainer')
      .appendTo(document.body)
      .element

function createPokemonCard(pokemon) {
      const mainType = pokemon.types[0].name
      const card = new Tool()
            .createElement('div')
            .class('card')
            .appendTo(container)
            .element
      card.style.setProperty('--bg-color', getTypeColor(mainType))
      new Tool()
            .createElement('img')
            .class('cardImg')
            .src(pokemon.image)
            .alt(pokemon.name)
            .appendTo(card)
      new Tool()
            .createElement('h2')
            .textContent(pokemon.name)
            .class('pkmnName')
            .appendTo(card)
      const types = new Tool()
            .createElement('div')
            .class('pkmnTypes')
            .appendTo(card)
            .element
      
      pokemon.types.forEach(type => {
            new Tool()
                  .createElement('img')
                  .class('typesImg')
                  .src(type.image)
                  .alt(type.name)
                  .appendTo(types)
      })

      allCards.push({element: card, data: pokemon})

      card.addEventListener('click', () => {
            window.location.href = `pokemon.html?id=${pokemon.pokedexId}`
      })

      return card
}

function filterPokemon(request) {
      request = request.toLowerCase()

      allCards.forEach(({element, data}) => {
            const name = data.name.toLowerCase()
            const generation = String(data.generation)
            const types = data.types.map(type => type.name.toLowerCase()).join(',')
            const pokedexId = String(data.pokedexId)
            const match = name.includes(request) || generation.includes(request) || types.includes(request) || pokedexId.includes(request)
            if (match) {
                  element.style.display = 'block'
            } else {
                  element.style.display = 'none'
            }
      })
}

const createPokedex = async () => {
      const data = await new Tool().getPokemon()
      data.forEach(pkmndata => {
             const pokemon = new Pokemon(pkmndata)
             createPokemonCard(pokemon)
      })
}

searchBar.addEventListener('input', (element) => {
  filterPokemon(element.target.value)
})

createPokedex()