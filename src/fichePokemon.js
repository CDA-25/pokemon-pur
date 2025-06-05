const params = new URLSearchParams(window.location.search)
const id = params.get("id");

const pokemonContainer = document.getElementsByClassName("pokemonContainer")[0]

const pokemonFiche = document.createElement('button')
pokemonFiche.className = 'pokemon'
pokemonContainer.appendChild(pokemonFiche)


fetch(`https://pokebuildapi.fr/api/v1/pokemon/${id}`)
    .then(response => response.json())
    .then(data => {
      const pokemonImage = document.createElement('img')
      pokemonImage.className = 'pokemonImg'
      pokemonImage.src = data.image
      pokemonImage.alt = data.name
      pokemonFiche.appendChild(pokemonImage)

      const pokemonName = document.createElement("h2")
      pokemonName.className = 'pokemonName'
      pokemonName.textContent = data.name
      pokemonFiche.appendChild(pokemonName)

      const pokemonTypesContainer = document.createElement('div')
      pokemonTypesContainer.className = 'pokemonTypeContainer'
      pokemonFiche.appendChild(pokemonTypesContainer)
      data.apiTypes.forEach((type) => {
            const pokemonType = document.createElement("p")
            pokemonType.className = 'pokemonType'
            pokemonType.textContent = `Type : ${type.name}`
            pokemonTypesContainer.appendChild(pokemonType)
      })


      const pokemonEvosContainer = document.createElement('div')
      pokemonEvosContainer.className = 'pokemonEvosContainer'
      pokemonFiche.appendChild(pokemonEvosContainer)
      if (data.apiPreEvolution != "none") {
            const pokemonPreEvo = document.createElement("p")
            pokemonPreEvo.className = 'pokemonPreEvo'
            pokemonPreEvo.textContent = `Pre Evolution : ${data.apiPreEvolution.name}`
            pokemonEvosContainer.appendChild(pokemonPreEvo)
      }

      if (data.apiEvolutions != "none") {
            data.apiEvolutions.forEach((Evo) => {
                  const pokemonPreEvo = document.createElement("p")
                  pokemonPreEvo.className = 'pokemonPreEvo'
                  pokemonPreEvo.textContent = `Evolution : ${Evo.name}`
                  pokemonEvosContainer.appendChild(pokemonPreEvo)
            })
      }


    })
    .catch(error => console.error('Error fetching Pokémon data:', error));

class Pokemon {
      constructor(data) {
            this.pokedexId = data.pokedexId
            this.name = data.name
            this.image = data.image
            this.sprite = data.sprite
            this.slug = data.slug
            this.generation = data.apiGeneration
            this.resistanceModifyingAbilities = data.resistanceModifyingAbilitiesForApi || []
            this.resistanceWithAbilities = data.apiResistancesWithAbilities || []
            
            const stats = data.stats
            this.hp = stats.HP
            this.attack = stats.attack
            this.defense = stats.defense
            this.special_attack = stats.special_attack
            this.special_defense = stats.special_defense
            this.speed = stats.speed

            this.types = data.apiTypes.map(type => ({
                  name: type.name,
                  image: type.image
            }))

            this.resistances = {}
            data.apiResistances.forEach(resistance => { 
                  this.resistances[resistance.name] = {
                        multiplier: resistance.damage_multiplier,
                        relation: resistance.damage_relation
                  }
            })

            if (data.apiEvolutions && Array.isArray(data.apiEvolutions)) {
                  this.evolutions = data.apiEvolutions.map(evolution => ({
                        name: evolution.name,
                        pokedexId: evolution.pokedexId
                  }))
            } else {
                  this.evolutions = []
            }

            if (data.apiPreEvolution !== "none") {
                  this.preEvolution = data.apiPreEvolution
            } else {
                  this.preEvolution = null
            }
      }
}
