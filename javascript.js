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
		<img src="${data.sprites.other.dream_world.front_default || data.sprites.front_default || "https://thumbs.dreamstime.com/b/no-pokemon-here-sign-riga-latvia-july-restricted-area-over-white-background-go-very-popular-virtual-74549871.jpg"}" /> 
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
