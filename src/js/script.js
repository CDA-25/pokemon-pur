window.addEventListener('load', function () {

    (async () => {
        const res = await fetch("https://pokebuildapi.fr/api/v1/pokemon", { method: "GET" })
        const date = await res.json()
        console.log(data)
    })()


})