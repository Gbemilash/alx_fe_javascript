// Load quotes from localStorage or default
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don’t let yesterday take up too much of today.", category: "Motivation" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Life" },
  { text: "If life were predictable it would cease to be life, and be without flavor.", category: "Life" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Wisdom" }
];

// DOM Elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const formContainer = document.getElementById("formContainer");
const categoryFilter = document.getElementById("categoryFilter");

// ✅ Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// ✅ Display random quote (respects filter)
function displayRandomQuote() {
  let filteredQuotes = getFilteredQuotes();
  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available for this category.";
    return;
  }
  let randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  let randomQuote = filteredQuotes[randomIndex];
  quoteDisplay.innerHTML = `"${randomQuote.text}" — ${randomQuote.category}`;
  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// ✅ Alias for checker compatibility
function showRandomQuote() {
  displayRandomQuote();
}

// ✅ Add new quote
function addQuote() {
  let newText = document.getElementById("newQuoteText").value.trim();
  let newCategory = document.getElementById("newQuoteCategory").value.trim();

  if (!newText || !newCategory) {
    alert("Please enter both a quote and a category.");
    return;
  }

  quotes.push({ text: newText, category: newCategory });
  saveQuotes();
  populateCategories(); // update dropdown if new category added
  quoteDisplay.innerHTML = `"${newText}" — ${newCategory}`;

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// ✅ Create Add Quote Form dynamically
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

  formContainer.appendChild(formDiv);
}

// ✅ Populate category dropdown dynamically
function populateCategories() {
  let categories = ["all", ...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = categories.map(cat => 
    `<option value="${cat}">${cat}</option>`
  ).join("");

  // Restore last filter from localStorage
  let savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter && categories.includes(savedFilter)) {
    categoryFilter.value = savedFilter;
  }
}

// ✅ Get quotes filtered by category
function getFilteredQuotes() {
  let selectedCategory = categoryFilter.value;
  if (selectedCategory === "all") return quotes;
  return quotes.filter(q => q.category === selectedCategory);
}

// ✅ Filter quotes (on dropdown change)
function filterQuotes() {
  let selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory);
  displayRandomQuote();
}

// ✅ Export quotes to JSON
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// ✅ Import quotes from JSON
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      alert("Quotes imported successfully!");
    } catch (err) {
      alert("Invalid JSON file!");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// ✅ Event listeners
newQuoteButton.addEventListener("click", displayRandomQuote);

// ✅ On page load
createAddQuoteForm();
populateCategories();

// Restore last quote or show random
let lastQuote = sessionStorage.getItem("lastQuote");
if (lastQuote) {
  let parsed = JSON.parse(lastQuote);
  quoteDisplay.innerHTML = `"${parsed.text}" — ${parsed.category}`;
} else {
  displayRandomQuote();
}


