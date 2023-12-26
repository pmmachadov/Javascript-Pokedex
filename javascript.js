const btn = document.getElementsByTagName("button")[0];
const input = document.getElementById("userinput");
const randBtn = document.getElementById("random");
const pokemonHtml = document.querySelector('.pokemon');

const pokemons = {};

const searchPokemon = async (apiObj) => {
  const { url, type, name } = apiObj;
  const apiUrl = `${url}${type}/${name}`;

  try {
    const rawData = await fetch(apiUrl);
    const data = await rawData.json();
    changeHtml(data);
  } catch (err) {
    handleError();
  }

  function changeHtml(data) {
    const newStats = data.stats.map(stat => `<p>${stat.stat.name} <span class="out">${stat.base_stat}</span></p>`);

    const newHtml = `
      <div class="details" align="center">
        <h1 class="name">${data.name}</h1>
        <img src="${data.sprites.other.dream_world.front_default || data.sprites.front_default}" /> 
        <table>
          <tr><th>Stat</th><th>Value</th></tr>
          <tr><td>Weight</td><td><span class="out">${data.weight} hg</span></td></tr>
          <tr><td>Types</td><td><span class="out">${data.types[0].type.name}</span></td></tr>
          <tr><td>Moves</td><td><span class="out">${data.moves[0].move.name}</span></td></tr>
          <tr><td>Ability</td><td><span class="out">${data.abilities[0].ability.name}</span></td></tr>
          <tr><td>Move Ailment</td><td><span class="out">${data.moves[0].version_group_details[0].move_learn_method.name}</span></td></tr>
        </table>
      </div>
     `;

    pokemonHtml.innerHTML = newHtml;
    input.value = "";
  }
};

// Helper Functions
function inputLength() {
  return input.value.length;
}

function makeUrl(value) {
  return {
    url: "https://pokeapi.co/api/v2/",
    type: "pokemon",
    name: value,
  };
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomize(event) {
  const searchValue = getRandomInt(1, 897);
  searchPokemon(makeUrl(searchValue));
}

function searchAfterClick(event) {
  if (inputLength() > 0) {
    searchPokemon(makeUrl(input.value));
  }
}

function searchAfterKeypress(event) {
  if (inputLength() > 0 && event.keyCode === 13) {
    searchPokemon(makeUrl(input.value));
  }
}

btn.addEventListener("click", searchAfterClick);
input.addEventListener("keypress", searchAfterKeypress);
randBtn.addEventListener("click", randomize);

// Cards
document.addEventListener("DOMContentLoaded", async () => {
  const pokemonContainer = document.getElementById("pokemon_container");
  const loadMoreBtn = document.getElementById("load_more");
  const numberOfPokemonPerPage = 6;
  let offset = 0;

  async function fetchAndProcessPokemonBatch() {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${numberOfPokemonPerPage}&offset=${offset}`;

    try {
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();

        await Promise.all(data.results.map(async (pokemonData, index) => {
          const pokemon = await fetchPokemonDetails(pokemonData.url);
          await processPokemon(pokemon);
        }));

        lazyLoadImages();
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    offset += numberOfPokemonPerPage;
  }

  // Initial load
  await fetchAndProcessPokemonBatch();

  // Load more button click event
  loadMoreBtn.addEventListener("click", async () => {
    await fetchAndProcessPokemonBatch();
  });

  async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  function processPokemon(pokemon) {
    const image = getImage(pokemon);
    const name = getName(pokemon);
    const pokemonId = getPokemonId(pokemon);
    const weight = getWeight(pokemon);
    const types = getTypes(pokemon);
    const moves = getMoves(pokemon);
    const ability = getAbility(pokemon);
    const moveAilment = getMoveAilment(pokemon);

    const pokemonInfo = {
      name: name,
      image: image,
      weight: weight,
      types: types,
      moves: moves,
      ability: ability,
      moveAilment: moveAilment
    };

    pokemons[pokemonId] = pokemonInfo;

    const pokemonCard = document.createElement("div");
    pokemonCard.className = "card";
    pokemonCard.innerHTML = `
      <h3>${name}</h3>
      <div class="pokemon-image">
        <img data-src="${image}" alt="${name}" loading="lazy">
      </div>
      <div class="card-body">
        <p><strong>ID:</strong> ${pokemonId}</p>
        <p><strong>Weight:</strong> ${weight}</p>
        <p><strong>Types:</strong> ${types}</p>
        <p><strong>Moves:</strong> ${moves}</p>
        <p><strong>Ability:</strong> ${ability}</p>
        <p><strong>Move Ailment:</strong> ${moveAilment}</p>
      </div>
    `;
    pokemonContainer.appendChild(pokemonCard);
  }

  function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.removeAttribute('data-src');
          observer.unobserve(lazyImage);
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      observer.observe(img);
    });
  } else {
    lazyLoadImages();
  }

  function getImage(pokemon) {
    return pokemon.sprites?.other?.dream_world?.front_default || "N/A";
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
