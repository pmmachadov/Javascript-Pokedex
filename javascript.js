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
        await processPokemon(pokemon);
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

  async function processPokemon(pokemon) {
    const image = getImage(pokemon);
    const name = getName(pokemon);
    const pokemonId = getPokemonId(pokemon);
    const weight = getWeight(pokemon);
    const types = getTypes(pokemon);
    const moves = getMoves(pokemon);
    const ability = getAbility(pokemon);
    const moveAilment = getMoveAilment(pokemon);

    // Crear un objeto con la información
    const pokemonInfo = {
      name: name,
      image: image,
      weight: weight,
      types: types,
      moves: moves,
      ability: ability,
      moveAilment: moveAilment
    };

    // Almacenar información en el objeto
    pokemons[pokemonId] = pokemonInfo;

    // Display information in the HTML
    const pokemonContainer = document.getElementById("pokemon_container");
    const pokemonCard = document.createElement("div");
    pokemonCard.className = "card";
    pokemonCard.innerHTML = `
      <h3>${name}</h3>
      <div class="pokemon-image">
      <img src="${image}" alt="${name}">
      </div>
      <div class="card-body">
      <p><h4>Id:</h4> ${pokemonId}</p>
      <p><h4>Wheight:</h4> ${weight}</p>
      <p><h4>Types:</h4> ${types}</p>
      <p><h4>Moves:</h4> ${moves}</p>
      <p><h4>Ability:</h4> ${ability}</p>
      <p><h4>Move Ailment:</h4> ${moveAilment}</p>
      </div>
    `;
    pokemonContainer.appendChild(pokemonCard);
  }

  // Funciones auxiliares para reducir la complejidad
  function getImage(pokemon) {
    return pokemon.sprites?.front_default || "N/A";
  }

  function getName(pokemon) {
    return pokemon.name || "N/A";
  }

  function getPokemonId(pokemon) {
    return pokemon.id || "N/A";
  }

  function getWeight(pokemon) {
    return pokemon.weight || "N/A";
  }

  function getTypes(pokemon) {
    return pokemon.types?.map(type => type.type.name).join(', ') || "N/A";
  }

  function getMoves(pokemon) {
    return pokemon.moves?.slice(0, 4).map(move => move.move.name).join(', ') || "N/A";
  }

  function getAbility(pokemon) {
    return pokemon.abilities?.length > 0 ? pokemon.abilities[0].ability.name : "N/A";
  }

  function getMoveAilment(pokemon) {
    return pokemon.moves?.length > 0 && pokemon.moves[0].version_group_details.length > 0
      ? pokemon.moves[0].version_group_details[0].move_learn_method.name
      : "N/A";
  }
});
