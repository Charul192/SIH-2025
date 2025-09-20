// script.js

// 1. The Data Source: A simple array of recommendations.
// Since you're in Ambala, let's use cities from Haryana.

const recommendations = [
    "Ambala", "Bhiwani", "Chandigarh", "Faridabad", "Fatehabad",
    "Gurgaon", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal",
    "Kurukshetra", "Mahendragarh", "Mewat", "Palwal", "Panchkula",
    "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"
];

// 2. Get references to the HTML elements
const searchInput = document.getElementById('searchInput');
const suggestionsContainer = document.getElementById('suggestionsContainer');

// 3. Add an event listener to the input field
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();

    // Clear previous suggestions
    suggestionsContainer.innerHTML = '';

    if (query.length > 0) {
        // Filter the recommendations based on the user's input
        const filteredRecommendations = recommendations.filter(item =>
            item.toLowerCase().startsWith(query)
        );

        // Display the filtered recommendations
        displaySuggestions(filteredRecommendations);
    }
});

function displaySuggestions(suggestions) {
    suggestions.forEach(suggestion => {
        // Create a div for each suggestion item
        const item = document.createElement('div');
        item.classList.add('suggestion-item');
        item.textContent = suggestion;

        // Add a click event to the item
        item.addEventListener('click', () => {
            searchInput.value = suggestion; // Put the suggestion in the input box
            suggestionsContainer.innerHTML = ''; // Clear the suggestions
        });

        suggestionsContainer.appendChild(item);
    });
}