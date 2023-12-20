document.addEventListener("DOMContentLoaded", async () => {
  // SearchBar
  let pokemons = {};

  // Add the search functionality
  const searchInput = document.getElementById("search_input");
  const searchButton = document.getElementById("search_button");

  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Verificar si el campo de búsqueda está vacío o solo contiene espacios
    if (!searchTerm) {
      return;
    }

    // Filter Pokémon that match the search term
    const filteredPokemon = Object.values(pokemons).filter(pokemon => {
      const pokemonName = pokemon.name.toLowerCase();
      const pokemonId = String(pokemon.id);

      return pokemonName.includes(searchTerm) || pokemonId.includes(searchTerm);
    });

    // Clear the container before showing the search results
    const pokemonContainer = document.getElementById("pokemon_container");
    pokemonContainer.innerHTML = "";

    // Show the search results
    filteredPokemon.forEach(pokemon => {
      processPokemon(pokemon);
    });
  });

  // Cards

  const url = `https://pokeapi.co/api/v2/pokemon?limit=1000`; // Cambiado a límite 1000 para obtener todos los Pokémon

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
        <p><h4>Weight:</h4> ${weight}</p>
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
    if (Array.isArray(pokemon.types)) {
      return pokemon.types.map(type => type.type.name).join(', ') || "N/A";
    } else {
      return "N/A";
    }
  }

  function getMoves(pokemon) {
    if (Array.isArray(pokemon.moves)) {
      return pokemon.moves.slice(0, 4).map(move => move.move.name).join(', ') || "N/A";
    } else {
      return "N/A";
    }
  }

  function getAbility(pokemon) {
    return pokemon.abilities?.length > 0 ? pokemon.abilities[0].ability.name : "N/A";
  }

  function getMoveAilment(pokemon) {
    if (Array.isArray(pokemon.moves) && pokemon.moves.length > 0) {
      if (
        Array.isArray(pokemon.moves[0].version_group_details) &&
        pokemon.moves[0].version_group_details.length > 0
      ) {
        return pokemon.moves[0].version_group_details[0].move_learn_method.name;
      }
    }

    return "N/A";
  }
});
