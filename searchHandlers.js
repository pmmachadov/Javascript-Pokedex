import { displayPokemonDetails } from './pokemonDetails.js';

export const initializeSearchHandlers = () => {
    const searchButton = document.querySelector(".searchButton");
    const randomButton = document.getElementById("random");
    const userInput = document.getElementById("userinput");

    searchButton.addEventListener("click", () => {
        if (userInput.value.length > 0) {
            searchPokemon(userInput.value);
            userInput.value = "";
        }
    });

    randomButton.addEventListener("click", randomPokemon);

    userInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter" && userInput.value.length > 0) {
            searchPokemon(userInput.value);
            userInput.value = "";
        }
    });
};

const searchPokemon = async (query) => {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${query}`;
    try {
        const rawData = await fetch(apiUrl);
        const data = await rawData.json();
        displayPokemonDetails(data);
    } catch (err) {
        console.error("Error fetching data:", err);
    }
};

const randomPokemon = () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    searchPokemon(randomId.toString());
};
