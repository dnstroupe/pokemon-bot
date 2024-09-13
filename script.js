let pokemonData; // Global variable to hold the current Pokémon's data

// Function to fetch Pokémon data from the API
async function fetchPokemonData(pokemonName) {
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        pokemonData = await response.json(); // Store data in global variable
        return pokemonData;
    } catch (error) {
        return null;
    }
}

// Function to handle sending messages and processing responses
function sendMessage() {
    let userMessage = document.getElementById("userInput").value.toLowerCase();
    let chatbox = document.getElementById("chatbox");

    // Add the user's message to the chatbox
    chatbox.innerHTML += `<p><strong>User:</strong> ${userMessage}</p>`;

    // Check if it's a Pokémon name
    if (!pokemonData) {
        fetchPokemonData(userMessage).then(data => {
            if (data) {
                // Display Pokémon data and sprite
                chatbox.innerHTML += `
                    <p><strong>Bot:</strong> Hello! I am <strong>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</strong>.</p>
                    <p>Ask me: "What’s your type?", "What are your abilities?", or "Can I catch you?"</p>
                    <img src="${data.sprites.front_default}" alt="${data.name}" class="pokemon-sprite">
                `;
            } else {
                // Handle unrecognized Pokémon names
                chatbox.innerHTML += `<p><strong>Bot:</strong> I don't recognize that Pokémon. Please try another name!</p>`;
            }
            chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to bottom
        });
    } else {
        // If Pokémon data is already loaded, continue the conversation
        handleConversation(userMessage);
    }

    // Clear the input field after sending the message
    document.getElementById("userInput").value = "";
}

// Function to handle follow-up conversations
function handleConversation(userMessage) {
    let chatbox = document.getElementById("chatbox");

    if (userMessage.includes("type")) {
        chatbox.innerHTML += `<p><strong>Bot:</strong> My type is ${pokemonData.types.map(type => type.type.name).join(", ")}.</p>`;
    } else if (userMessage.includes("abilities")) {
        chatbox.innerHTML += `<p><strong>Bot:</strong> My abilities are ${pokemonData.abilities.map(ability => ability.ability.name).join(", ")}.</p>`;
    } else if (userMessage.includes("catch")) {
        chatbox.innerHTML += `<p><strong>Bot:</strong> You can't catch me here, but I’ll always be with you in the chat!</p>`;
    } else {
        // For unrecognized questions
        chatbox.innerHTML += `<p><strong>Bot:</strong> I don't understand that. Try asking: "What’s your type?", "What are your abilities?", or "Can I catch you?"</p>`;
    }

    chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to bottom
}

// Function to clear the chatbox and reset the bot state
function clearChat() {
    document.getElementById("chatbox").innerHTML = "";  // Clears chatbox content
    document.getElementById("userInput").value = "";    // Clears input field
    pokemonData = null;  // Reset the pokemonData to allow for new conversations
}
