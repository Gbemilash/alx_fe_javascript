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
const categorySelect = document.getElementById("categorySelect");

// Function to display a random quote
function showRandomQuote() {
  let selectedCategory = categorySelect.value;

  // Filter quotes based on category
  let filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available in this category.";
    return;
  }

  // Pick random quote
  let randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  let randomQuote = filteredQuotes[randomIndex];

  quoteDisplay.textContent = `"${randomQuote.text}" — ${randomQuote.category}`;
}

// Function to add a new quote
function addQuote() {
  let newText = document.getElementById("newQuoteText").value.trim();
  let newCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newText === "" || newCategory === "") {
    alert("Please enter both a quote and a category.");
    return;
  }

  // Add to quotes array
  quotes.push({ text: newText, category: newCategory });

  // Add category to dropdown if not already there
  if (![...categorySelect.options].some(opt => opt.value === newCategory)) {
    let newOption = document.createElement("option");
    newOption.value = newCategory;
    newOption.textContent = newCategory;
    categorySelect.appendChild(newOption);
  }

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("New quote added successfully!");
}

// Event listener for button
newQuoteButton.addEventListener("click", showRandomQuote);

// Show a random quote on page load
showRandomQuote();
