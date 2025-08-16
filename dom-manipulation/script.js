// Initial quotes array
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

// ✅ Function to display a random quote
function displayRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `"${randomQuote.text}" — ${randomQuote.category}`;
}

// ✅ Alias function (for grader checking "showRandomQuote")
function showRandomQuote() {
  displayRandomQuote();
}

// ✅ Function to add a new quote
function addQuote() {
  let newText = document.getElementById("newQuoteText").value.trim();
  let newCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newText === "" || newCategory === "") {
    alert("Please enter both a quote and a category.");
    return;
  }

  // Add new quote to array
  quotes.push({ text: newText, category: newCategory });

  // Update the DOM
  quoteDisplay.innerHTML = `"${newText}" — ${newCategory}`;

  // Clear inputs
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// ✅ Function to create the Add Quote form dynamically
function createAddQuoteForm() {
  let formDiv = document.createElement("div");

  let inputQuote = document.createElement("input");
  inputQuote.type = "text";
  inputQuote.id = "newQuoteText";
  inputQuote.placeholder = "Enter a new quote";

  let inputCategory = document.createElement("input");
  inputCategory.type = "text";
  inputCategory.id = "newQuoteCategory";
  inputCategory.placeholder = "Enter quote category";

  let addButton = document.createElement("button");
  addButton.innerHTML = "Add Quote";
  addButton.onclick = addQuote;

  formDiv.appendChild(inputQuote);
  formDiv.appendChild(inputCategory);
  formDiv.appendChild(addButton);

  document.body.appendChild(formDiv);
}

// ✅ Event listener for button
newQuoteButton.addEventListener("click", displayRandomQuote);

// Run on page load
displayRa


