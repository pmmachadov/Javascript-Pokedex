import { initializeSearchHandlers } from './searchHandlers.js';
import { loadInitialPokemonCards } from './pokemonCards.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeSearchHandlers(); // De esta forma se ejecuta el código de searchHandlers.js para que se inicialicen los listeners de los botones de búsqueda y de random.
    loadInitialPokemonCards();
});
