import { initializeSearchHandlers } from './searchHandlers.js';
import { loadInitialPokemonCards } from './pokemonCards.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeSearchHandlers();
    loadInitialPokemonCards();
});
