document.addEventListener("DOMContentLoaded", () => {
  const numberOfPokemon = 10;
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=${numberOfPokemon}`;
  let pokemons = [];

  fetch(url)
    .then(async (response) => {
      if (response.status === 200) {
        const data = await response.json();
        pokemons = data.results;

        pokemons.forEach(async (pokemonData) => {
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

          // Log information to the console
          console.log('------------------------');
          console.log(`Name: ${name}`);
          console.log(`ID: ${pokemonId}`);
          console.log(`Weight: ${weight}`);
          console.log(`Types: ${types}`);
          console.log(`Moves: ${moves}`);
          console.log(`Ability: ${ability}`);
          console.log(`Move Ailment: ${move_ailment}`);
          console.log('------------------------');

          // Display information in the HTML
          const pokemonContainer = document.getElementById("pokemon_container");
          const pokemonElement = document.createElement("div");
          pokemonElement.innerHTML = `
            <h3>${name}</h3>
            <img src="${image}" alt="${name}">
              <p>ID: ${pokemonId}</p>
              <p>Weight: ${weight}</p>
              <p>Types: ${types}</p>
              <p>Moves: ${moves}</p>
              <p>Ability: ${ability}</p>
              <p>Move Ailment: ${move_ailment}</p>
              <hr>
                `;
          pokemonContainer.appendChild(pokemonElement);
        });
      } else {
        console.error("Failed to fetch data");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
});
