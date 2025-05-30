window.addEventListener('load', function () {

    class Pokemons {
        constructor(id, name, image) {
            this.id = id
            this.name = name
            this.image = image
        }
    }

    (async () => {
        const res = await fetch("https://pokebuildapi.fr/api/v1/pokemon", { method: "GET" })
        const data = await res.json()
        data.forEach(pokemon => {
            for (const key in pokemon) {
                if (Array.isArray(pokemon[key])) {
                    console.log(`id:: ${pokemon.id}, Pokemon: ${pokemon.name}`);
                }
            }
        });
    })()




    // class pokemon = propriétés de l'objet de l'api etc 

})