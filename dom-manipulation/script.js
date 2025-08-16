// Quotes array
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don’t let yesterday take up too much of today.", category: "Inspiration" },
  { text: "It’s not whether you get knocked down, it’s whether you get up.", category: "Resilience" }
];

// DOM elements
const quoteText = document.getElementById("quote-text");
const quoteCategory = document.getElementById("quote-category");
const showQuoteBtn = document.getElementById("show-quote-btn");
const addQuoteForm = document.getElementById("add-quote-form");
const categoryDropdown = document.getElementById("category-dropdown");

// Display a random quote
function displayRandomQuote() {
  if (quotes.length === 0) return;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteText.textContent = randomQuote.text;
  quoteCategory.textContent = `Category: ${randomQuote.category}`;
}

// Add new quote
function addQuote(e) {
  e.preventDefault();
  const text = document.getElementById("new-quote-text").value;
  const category = document.getElementById("new-quote-category").value;

  if (text && category) {
    const newQuote = { text, category };
    quotes.push(newQuote);
    localStorage.setItem("quotes", JSON.stringify(quotes));
    postQuoteToServer(newQuote); // also sync to server
    populateCategories();
    displayRandomQuote();
    addQuoteForm.reset();
  }
}

// Populate dropdown with unique categories
function populateCategories() {
  categoryDropdown.innerHTML = '<option value="all">All</option>';
  const categories = [...new Set(quotes.map(q => q.category))];
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryDropdown.appendChild(option);
  });

  // Restore last selected category
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    categoryDropdown.value = savedCategory;
    filterQuotes(savedCategory);
  }
}

// Filter quotes by category
function filterQuotes(selectedCategory) {
  localStorage.setItem("selectedCategory", selectedCategory);
  if (selectedCategory === "all") {
    displayRandomQuote();
    return;
  }
  const filtered = quotes.filter(q => q.category === selectedCategory);
  if (filtered.length > 0) {
    const randomIndex = Math.floor(Math.random() * filtered.length);
    const randomQuote = filtered[randomIndex];
    quoteText.textContent = randomQuote.text;
    quoteCategory.textContent = `Category: ${randomQuote.category}`;
  } else {
    quoteText.textContent = "No quotes available in this category.";
    quoteCategory.textContent = "";
  }
}

// ----------------------------
// 🚀 NEW: Server Sync Features
// ----------------------------
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";

// Fetch quotes from server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const serverData = await response.json();

    // Map server posts into quotes format
    const serverQuotes = serverData.slice(0, 5).map(post => ({
      text: post.title,
      category: "Server"
    }));

    handleServerSync(serverQuotes);
  } catch (error) {
    console.error("Error fetching from server:", error);
  }
}

// Post a new quote to server
async function postQuoteToServer(quote) {
  try {
    await fetch(




