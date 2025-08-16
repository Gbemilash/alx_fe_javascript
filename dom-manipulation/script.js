// ===== Quotes Data and Storage =====
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to predict the future is to invent it.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// ===== Server Simulation Functions =====

// Fetch quotes from server (mock API)
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    // Simulate server quotes structure
    const serverQuotes = data.slice(0, 5).map(item => ({
      text: item.title,
      category: "Server"
    }));

    // Conflict resolution: server data takes precedence
    quotes = [...quotes, ...serverQuotes];
    saveQuotes();
    showNotification("Quotes synced from server.");
    renderCategories();
  } catch (error) {
    console.error("Error fetching from server:", error);
  }
}

// Post new quote to server (mock API)
async function postQuoteToServer(quote) {
  try {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quote)
    });
    showNotification("Quote posted to server.");
  } catch (error) {
    console.error("Error posting to server:", error);
  }
}

// Sync quotes with server
async function syncQuotes() {
  await fetchQuotesFromServer();
  quotes.forEach(q => postQuoteToServer(q));
}

// Periodically check for updates from server (every 30s)
setInterval(syncQuotes, 30000);

// ===== UI Notifications =====
function showNotification(message) {
  const note = document.createElement("div");
  note.textContent = message;
  note.style.background = "#4caf50";
  note.style.color = "white";
  note.style.padding = "8px";
  note.style.margin = "10px 0";
  note.style.borderRadius = "5px";
  document.body.prepend(note);

  setTimeout(() => note.remove(), 3000);
}

// ===== Existing Display and Add Quote Logic =====
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

function createAddQuoteForm() {
  const form = document.getElementById("addQuoteForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = document.getElementById("quoteText").value;
    const category = document.getElementById("quoteCategory").value;
    if (text && category) {
      const newQuote = { text, category };
      quotes.push(newQuote);
      saveQuotes();
      postQuoteToServer(newQuote);
      form.reset();
      showNotification("Quote added successfully!");
    }
  });
}

// ===== Filter by Category =====
function renderCategories() {
  const dropdown = document.getElementById("categoryFilter");
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];

  dropdown.innerHTML = `<option value="all">All</option>`;
  uniqueCategories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    dropdown.appendChild(option);
  });

  const lastSelected = localStorage.getItem("selectedCategory");
  if (lastSelected) {
    dropdown.value = lastSelected;
    filterQuote();
  }
}

function filterQuote() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selected);

  const quoteDisplay = document.getElementById("quoteDisplay");
  if (selected === "all") {
    showRandomQuote();
    return;
  }

  const filtered = quotes.filter(q => q.category === selected);
  if (filtered.length === 0) {
    quoteDisplay.textContent = "No quotes in this category.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * filtered.length);
  const quote = filtered[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
}

// ===== Initialize =====
document.getElementById("newQuoteBtn").addEventListener("click", showRandomQuote);
document.getElementById("categoryFilter").addEventListener("change", filterQuote);

createAddQuoteForm();
renderCategories();
showRandomQuote();
syncQuotes(); // Initial sync

