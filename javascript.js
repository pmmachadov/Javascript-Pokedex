let btn = document.getElementsByTagName("button")[0];
let input = document.getElementById("userinput");
let rand_btn = document.getElementById("random");
const pokemon_html = document.querySelector('.pokemon')

const SearchPokemon = (api_obj) => {
  const { url, type, name } = api_obj;
  const api_url = `${url}${type}/${name}`;

  fetch(api_url)
    .then((raw_data) => raw_data.json())
    .then((data) => changeHtml(data))
    .catch((err) => {
      pokemon_html.innerHTML =
        `<h1> Some Error Occurred.. Please revise your code! </h1>`;
    });

  const changeHtml = (data) => {
    let new_stats = [];
    const get_stats = () => {
      for (let i = 0; i < data.stats.length; i++) {
        new_stats += [`<p> ${data.stats[i].stat.name} has base-stat of <span class="out">${data.stats[i].base_stat}</span> </p>`];
      }
      return new_stats;
    };
    const got_stats = get_stats();

    const newHtml = `
	<div class="details" align="center">
		<h1 class="name">${data.name}</h1>
		<img src="${data.sprites.other.dream_world.front_default || data.sprites.front_default}" /> 
		<h3>weight: <span class="out">${data.weight} hg</span></h3>
		<h3>height: <span class="out">${data.height} dm</span></h3>
		<h3>type: <span class="out">${data.types[0]?.type.name || ""}</span></h3>
	</div>
	<div class="stats">
		<h3>${data.name}'s stats: </h3>
		${got_stats}
	</div>`;

    pokemon_html.innerHTML = newHtml;
    input.value = "";
  };
};

function inputLength() {
  return input.value.length;
}

function MakeUrl(value) {
  const api_obj = {
    url: "https://pokeapi.co/api/v2/",
    type: "pokemon",
    name: value,
  };
  return api_obj;
}

function getRandomInt(min, max) {
  let rand_int = Math.floor(Math.random() * (max - min) + min);
  console.log(rand_int);
  return rand_int;
}

function Randomize(event) {
  const search_value = getRandomInt(1, 897);
  SearchPokemon(MakeUrl(search_value));
}

function SearchAfterClick(event) {
  if (inputLength() > 0) {
    SearchPokemon(MakeUrl(input.value));
  }
}

function SearchAfterKeypress(event) {
  if (inputLength() > 0 && event.keyCode === 13) {
    SearchPokemon(MakeUrl(input.value));
  }
}
btn.addEventListener("click", SearchAfterClick);
input.addEventListener("keypress", SearchAfterKeypress);
rand_btn.addEventListener("click", Randomize);


// Cards

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
    try {
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

      const pokemonContainer = document.getElementById("pokemon_container");
      const pokemonCard = document.createElement("div");
      pokemonCard.className = "card";
      pokemonCard.innerHTML = `
      <h3>${name}</h3>
      <div class="pokemon-image">
        <img data-src="${image}" alt="${name}" loading="lazy">
      </div>
      <div class="card-body">
        <p><h4>ID:</h4> ${pokemonId}</p>
        <p><h4>Weight:</h4> ${weight}</p>
        <p><h4>Types:</h4> ${types}</p>
        <p><h4>Moves:</h4> ${moves}</p>
        <p><h4>Ability:</h4> ${ability}</p>
        <p><h4>Move Ailment:</h4> ${moveAilment}</p>
      </div>
    `;
      pokemonContainer.appendChild(pokemonCard);
    } catch (error) {
      console.error("Error processing Pokemon:", error);
    }
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
    // Elimina la siguiente línea si decides no usar lazyLoadImages
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
