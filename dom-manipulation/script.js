// Load quotes from localStorage or set default
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const categorySelect = document.getElementById("categorySelect");

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Show random quote
function showRandomQuote() {
  const filteredQuotes = categorySelect.value === "all"
    ? quotes
    : quotes.filter(q => q.category === categorySelect.value);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }

  const random = Math.floor(Math.random() * filteredQuotes.length);
  quoteDisplay.textContent = filteredQuotes[random].text;
  sessionStorage.setItem("lastViewedQuote", quoteDisplay.textContent);
}

// Add quote
function addQuote(text, category) {
  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  syncQuotes(); // Sync after adding
}

// Filter quotes
function filterQuotes() {
  localStorage.setItem("selectedCategory", categorySelect.value);
  showRandomQuote();
}

// Populate dropdown with unique categories
function populateCategories() {
  const categories = ["all", ...new Set(quotes.map(q => q.category))];
  categorySelect.innerHTML = "";
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });

  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory && categories.includes(savedCategory)) {
    categorySelect.value = savedCategory;
  }
}

// --- SERVER SYNC ---
// Sync quotes with mock API
async function syncQuotes() {
  try {
    // POST local quotes to server
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quotes)
    });

    // GET latest quotes from server (simulate)
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const serverData = await response.json();

    // Simple conflict resolution: server wins
    if (serverData && serverData.title) {
      quotes.push({ text: serverData.title, category: "Server" });
      saveQuotes();
      populateCategories();
      alert("Quotes updated from server (conflict resolved).");
    }
  } catch (error) {
    console.error("Error syncing with server:", error);
  }
}

// Periodically check server every 15 seconds
setInterval(syncQuotes, 15000);

// --- INITIALIZE ---
populateCategories();
showRandomQuote();
