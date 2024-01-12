export const displayPokemonDetails = (pokemonData) => {
    const pokemonHtml = document.querySelector('.pokemon');
    pokemonHtml.innerHTML = createPokemonDetailsHTML(pokemonData);
};

const createPokemonDetailsHTML = (data) => {
    return `
        <div class="details" align="center">
            <h1 class="name">${data.name}</h1>
            <img src="${data.sprites.other.dream_world.front_default || data.sprites.front_default}" />
            <table>
                <tr><th>Stat</th><th>Value</th></tr>
                <tr><td>Weight</td><td><span class="out">${data.weight} hg</span></td></tr>
                <tr><td>Types</td><td><span class="out">${data.types.map(type => type.type.name).join(', ')}</span></td></tr>
                <tr><td>Moves</td><td><span class="out">${data.moves.map(move => move.move.name).join(', ')}</span></td></tr>
                <tr><td>Ability</td><td><span class="out">${data.abilities.map(ability => ability.ability.name).join(', ')}</span></td></tr>
                <tr><td>Move Ailment</td><td><span class="out">${data.moves.length > 0 && data.moves[0].version_group_details.length > 0 ? data.moves[0].version_group_details[0].move_learn_method.name : "N/A"}</span></td></tr>
            </table>
        </div>
    `;
};
