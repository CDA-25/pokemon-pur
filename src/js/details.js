window.addEventListener("load", async () => {
  const boutonRetour = document.getElementById("btnRetour");
  boutonRetour?.addEventListener("click", () => window.history.back());

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return console.error("Aucun ID trouvé dans l'URL");

  try {
    const res = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${id}`);
    const pokemon = await res.json();

    document.querySelector(
      "#pokemonName"
    ).textContent = `#${pokemon.id} ${pokemon.name}`;
    const image = document.querySelector("#pokemonImage");
    image.src = pokemon.image;
    image.alt = `Image de ${pokemon.name}`;

    const typesContainer = document.querySelector("#pokemonTypes");
    typesContainer.textContent = "";

    pokemon.apiTypes.forEach((type) => {
      const typeDiv = document.createElement("div");
      typeDiv.classList.add("type-block");

      const img = document.createElement("img");
      img.src = type.image;
      img.alt = type.name;
      img.classList.add("type-icon");

      const label = document.createElement("span");
      label.textContent = type.name;

      typeDiv.appendChild(img);
      typeDiv.appendChild(label);
      typesContainer.appendChild(typeDiv);
    });

    const statLabels = {
      HP: "PV",
      attack: "Atk",
      defense: "Def",
      special_attack: "Atk Spe",
      special_defense: "Def Spe",
      speed: "Vit",
    };

    const statsContainer = document.querySelector("#pokemonStats");
    statsContainer.textContent = "";

    for (const [stat, value] of Object.entries(pokemon.stats)) {
      const statDiv = document.createElement("div");
      statDiv.classList.add("stat-container");

      const label = document.createElement("span");
      label.textContent = `${statLabels[stat] || stat} : `;

      const bar = document.createElement("div");
      bar.classList.add("progress-bar");

      const fill = document.createElement("div");
      fill.classList.add("bar");
      fill.style.width = `${value / 2}%`;
      fill.textContent = value;

      bar.appendChild(fill);
      statDiv.appendChild(label);
      statDiv.appendChild(bar);
      statsContainer.appendChild(statDiv);
    }

    document.querySelector("#pokemonGen").textContent = pokemon.apiGeneration;
    const preEvo = document.querySelector("#pokemonPreEvo");
    preEvo.textContentHTML = "";

    if (pokemon.apiPreEvolution) {
      const preEvos = Array.isArray(pokemon.apiPreEvolution)
        ? pokemon.apiPreEvolution
        : [pokemon.apiPreEvolution];

      if (preEvos.length === 0 || !preEvos[0].name) {
        preEvo.textContent = "Aucune";
      } else {
        for (const evo of preEvos) {
          try {
            const resPre = await fetch(
              `https://pokebuildapi.fr/api/v1/pokemon/${evo.name}`
            );
            const dataPre = await resPre.json();

            const lien = document.createElement("a");
            lien.href = `details.html?id=${dataPre.id}`;
            lien.style.display = "flex";
            lien.style.alignItems = "center";
            lien.style.gap = "10px";
            lien.style.marginBottom = "8px";

            const image = document.createElement("img");
            image.src = dataPre.image;
            image.alt = dataPre.name.fr;
            image.style.width = "60px";
            image.style.height = "60px";

            const nom = document.createElement("span");
            nom.textContent = dataPre.name.fr;

            lien.appendChild(image);
            lien.appendChild(nom);
            preEvo.appendChild(lien);
          } catch (err) {
            console.error("Erreur pré-évolution :", err);
          }
        }
      }
    } else {
      preEvo.textContent = "Aucune";
    }

    const evoContainer = document.querySelector("#pokemonEvo");
    evoContainer.textContent = "";

    if (pokemon.apiEvolutions && pokemon.apiEvolutions.length > 0) {
      for (const evo of pokemon.apiEvolutions) {
        try {
          const resEvo = await fetch(
            `https://pokebuildapi.fr/api/v1/pokemon/${evo.name}`
          );
          const dataEvo = await resEvo.json();

          const lien = document.createElement("a");
          lien.href = `details.html?id=${dataEvo.id}`;
          lien.style.display = "flex";
          lien.style.alignItems = "center";
          lien.style.gap = "10px";
          lien.style.marginBottom = "8px";

          const image = document.createElement("img");
          image.src = dataEvo.image;
          image.alt = dataEvo.name.fr;
          image.style.width = "60px";
          image.style.height = "60px";

          const nom = document.createElement("span");
          nom.textContent = dataEvo.name.fr;

          lien.appendChild(image);
          lien.appendChild(nom);
          evoContainer.appendChild(lien);
        } catch (err) {
          console.error("Erreur évolution :", err);
        }
      }
    } else {
      evoContainer.textContent = "Aucune";
    }

    const groupedByRelation = pokemon.apiResistances.reduce((acc, res) => {
      if (!acc[res.damage_relation]) acc[res.damage_relation] = [];
      acc[res.damage_relation].push(res);
      return acc;
    }, {});

    const container = document.querySelector("#pokemonRes");
    container.textContent = "";

    for (const relation in groupedByRelation) {
      if (relation.toLowerCase() === "neutral") continue;

      const section = document.createElement("div");
      const titre = document.createElement("p");
      titre.textContent = relation.toUpperCase();
      titre.classList.add("titreResistance");
      section.appendChild(titre);

      groupedByRelation[relation].forEach((r) => {
        const p = document.createElement("p");
        p.textContent = `${r.name} (x${r.damage_multiplier})`;
        section.appendChild(p);
      });

      container.appendChild(section);
    }
  } catch (error) {
    console.error("Erreur de récupération du Pokémon :", error);
  }
});
