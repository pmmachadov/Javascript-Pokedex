document.addEventListener("DOMContentLoaded", () => {
  // const url = "https://pokeapi.co/api/v2/pokemon/";
  const url = "https://pokeapi.co/api/v2/ability/?limit=20&offset=20";
  let pokemon = {};

  fetch(url)
    .then(async (response) => {
      if (response.status === 200) {
        pokemon = await response.json();

        const image = pokemon.sprites.front_default;
        const name = pokemon.name;
        const pokemonId = pokemon.id;
        const type = pokemon.types[0].type.name;
        const ability = pokemon.abilities[0].ability.name;
        const move = pokemon.moves[0].move.name;
        const weight = pokemon.weight;
        const move_ailment = pokemon.moves[0].version_group_details[0].move_learn_method.name;
        const nature = pokemon.nature;
        const id = pokemon.id;
        const types = pokemon.types.map(type => type.type.name);
        const moves = pokemon.moves.slice(0, 4).map(move => move.move.name);




        // Mostrar el nombre y tipo en el HTML
        document.getElementById("image").src = image;
        document.getElementById("pokemon_name").textContent = "Name: " + name;
        document.getElementById("pokemon_id").textContent = "ID: " + pokemonId;
        document.getElementById("type").textContent = "Type: " + type;
        document.getElementById("ability").textContent = "Ability: " + ability;
        document.getElementById("move").textContent = "Move: " + move;
        document.getElementById("weight").textContent = "Weight: " + weight;
        document.getElementById("move_ailment").textContent = "Move Ailment: " + move_ailment;
        document.getElementById("nature").textContent = "Nature: " + nature;
        document.getElementById("id").textContent = "ID: " + id;
        document.getElementById("types").textContent = "Types: " + types;
        document.getElementById("moves").textContent = "Moves: " + moves;










        // Mostrar más datos en la consola
        console.log("Image:", image);
        console.log("Name:", name);
        console.log("Type:", type);
        console.log("Ability:", ability);
        console.log("Move:", move);
        console.log("Weight:", weight);
        console.log("Move Ailment:", move_ailment);
        console.log("Nature:", nature);
        console.log("ID:", id);
        console.log("Types:", types);
        console.log("Moves:", moves);





      } else {
        throw new Error(response.status);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
