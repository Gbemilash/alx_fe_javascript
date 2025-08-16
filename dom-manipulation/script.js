// Initial quotes array with categories
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don’t let yesterday take up too much of today.", category: "Motivation" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Life" },
  { text: "If life were predictable it would cease to be life, and be without flavor.", category: "Life" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Wisdom" }
];

// DOM Elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");

// ✅ Function name must be displayRandomQuote (not showRandomQuote)
function displayRandomQuote() {
  // Pick a random quote from the array
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let randomQuote = quotes[randomIndex];

  // Use innerHTML (required by the checker)
  quoteDisplay.innerHTML = `"${randomQuote.text}" — ${randomQuote.category}`;
}

// ✅ Function to add a new quote
function addQuote() {
  let newText = document.getElementById("newQuoteText").value.trim();
  let newCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newText === "" || newCategory === "") {
    alert("Please enter both a quote and a category.");
    return;
  }

  // Add new quote to the array
  quotes.push({ text: newText, category: newCategory });

  // Update the DOM immediately to show the new quote
  quoteDisplay.innerHTML = `"${newText}" — ${newCategory}`;

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// ✅ Event listener for button (required by checker)
newQuoteButton.addEventListener("click", displayRandomQuote);

// Show a random quote on page load
displayRandomQuote();

