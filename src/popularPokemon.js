const popularPokemon = document.getElementsByClassName('popularPokemons')[0]
const popularPokemonBtn = document.getElementsByClassName('carousselBtn')[0]

fetch('https://pokebuildapi.fr/api/v1/pokemon')
    .then(response => response.json())
    .then(data => { console.log(data); })
    .catch(error => console.error('Error fetching Pokémon data:', error))

function random1To898() {
    return Math.floor(Math.random() * 898) + 1
}

function setPopularPokemon(nb) {
    for (let i = 0; i < nb; i++) {
        const pokemonBtn = document.createElement('button')
        pokemonBtn.className = 'popularPokemon'
        popularPokemon.appendChild(pokemonBtn)
        const randomId = random1To898()
        fetch(`https://pokebuildapi.fr/api/v1/pokemon/${randomId}`)
            .then(response => response.json())
            .then(data => {
                const pokemonImage = document.createElement('img')
                pokemonImage.className = 'popularPokemonImg'
                pokemonImage.src = data.image
                pokemonImage.alt = data.name
                pokemonBtn.appendChild(pokemonImage)

                const pokemonName = document.createElement('h3')
                pokemonName.className = 'popularPokemonName'
                pokemonName.textContent = data.name
                pokemonBtn.appendChild(pokemonName)

                pokemonBtn.addEventListener('click', () => {
                    window.location.href = `fichePokemon.html?id=${data.id}`
                })
            })
            .catch(error => console.error('Error fetching popular Pokemon data:', error))
    }
}

setPopularPokemon(4)

popularPokemonBtn.addEventListener('click', () => {
    popularPokemon.innerHTML = ''
    setPopularPokemon(4)
})