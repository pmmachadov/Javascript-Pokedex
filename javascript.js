const url = "https://pokeapi.co/api/v2/pokemon/1/";

let pokemon = {};

fetch(url)
  .then(async (response) => {
    if (response.status === 200) {
      // Assign the result of the promise to the pokemon variable
      pokemon = await response.json();

      // Extract the name of the Pokémon from the returned object
      const nombre = pokemon.name;

      // Show the name and type of the Pokémon in the console
      console.log("Nombre del Pokémon:", nombre);
      console.log("Tipo del Pokémon:", pokemon.types[0].name);
    } else {
      throw new Error(response.status);
    }
  })
  .catch((error) => {
    console.log(error);
  });

