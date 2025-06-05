export default class Pokemon {
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