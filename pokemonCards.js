export const loadInitialPokemonCards = async () => {
    const loadMoreButton = document.getElementById("load_more");
    loadMoreButton.addEventListener("click", loadMorePokemon);

    await loadPokemonBatch();
};

const loadMorePokemon = async () => {
    await loadPokemonBatch();
};

const loadPokemonBatch = async () => {
    const pokemonContainer = document.getElementById("pokemon_container");
    const numberOfPokemonPerPage = 6;
    let offset = pokemonContainer.children.length;

    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${numberOfPokemonPerPage}&offset=${offset}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        data.results.forEach(async (pokemonData) => {
            const pokemonResponse = await fetch(pokemonData.url);
            const pokemon = await pokemonResponse.json();
            const pokemonCardHTML = createPokemonCardHTML(pokemon);
            pokemonContainer.innerHTML += pokemonCardHTML;
        });
    } catch (error) {
        console.error("Error loading Pokemon:", error);
    }
};

const createPokemonCardHTML = (pokemon) => {
    return `
        <div class="card">
            <h3>${pokemon.name}</h3>
            <img src="${pokemon.sprites.other.dream_world.front_default || pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" /> 
            <div class="card-body">
                <p><strong>ID:</strong> ${pokemon.id}</p>
                <p><strong>Weight:</strong> ${pokemon.weight}</p>
                <p><strong>Types:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
                <p><strong>Moves:</strong> ${pokemon.moves.map(move => move.move.name).slice(0, 4).join(', ')}</p>
                <p><strong>Ability:</strong> ${pokemon.abilities.map(ability => ability.ability.name).slice(0, 1).join(', ')}</p>
            </div>
        </div>
    `;
};
