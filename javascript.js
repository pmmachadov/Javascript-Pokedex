document.addEventListener("DOMContentLoaded", async () => {
  const numberOfPokemon = 10;
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=${numberOfPokemon}`;
  let pokemons = {};

  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();

      await Promise.all(data.results.map(async (pokemonData) => {
        const pokemon = await fetchPokemonDetails(pokemonData.url);

        const image = pokemon.sprites?.front_default || "N/A";
        const name = pokemon.name || "N/A";
        const pokemonId = pokemon.id || "N/A";
        const weight = pokemon.weight || "N/A";
        const types = pokemon.types?.map(type => type.type.name).join(', ') || "N/A";
        const moves = pokemon.moves?.slice(0, 4).map(move => move.move.name).join(', ') || "N/A";
        const ability = pokemon.abilities?.length > 0 ? pokemon.abilities[0].ability.name : "N/A";
        const move_ailment = pokemon.moves?.length > 0 && pokemon.moves[0].version_group_details.length > 0
          ? pokemon.moves[0].version_group_details[0].move_learn_method.name
          : "N/A";

        // Crear un objeto con la información
        const pokemonInfo = {
          name: name,
          image: image,
          weight: weight,
          types: types,
          moves: moves,
          ability: ability,
          move_ailment: move_ailment
        };

        // Almacenar información en el objeto
        pokemons[pokemonId] = pokemonInfo;

        // Convertir el objeto a una cadena JSON
        const pokemonInfoString = JSON.stringify(pokemonInfo);

        // Display information in the HTML
        const pokemonContainer = document.getElementById("pokemon_container");
        const pokemonCard = document.createElement("div");
        pokemonCard.className = "card";
        pokemonCard.innerHTML = `
          <h3>${name}</h3>
          <img src="${image}" alt="${name}">
          <p>ID: ${pokemonId}</p>
          <p>Weight: ${weight}</p>
          <p>Types: ${types}</p>
          <p>Moves: ${moves}</p>
          <p>Ability: ${ability}</p>
          <p>Move Ailment: ${move_ailment}</p>
        `;
        pokemonContainer.appendChild(pokemonCard);
      }));
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error:", error);
  }

  async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
});
