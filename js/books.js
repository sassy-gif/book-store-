// ============================================
// BOOKS PAGE FUNCTIONALITY
// This file handles search and filtering
// ============================================

// Current filter state
let currentSearch = "";
let currentCategory = "all";

// Display all books with current filters
function displayBooks() {
  const container = document.getElementById("books-grid");
  const noResults = document.getElementById("no-results");

  // Get all books
  let filteredBooks = getAllBooks();

  // Apply search filter
  if (currentSearch) {
    const searchLower = currentSearch.toLowerCase();
    filteredBooks = filteredBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower) ||
        book.description.toLowerCase().includes(searchLower)
    );
  }

  // Apply category filter
  if (currentCategory !== "all") {
    filteredBooks = filteredBooks.filter((book) => book.category === currentCategory);
  }

  // Show books or no results message
  if (filteredBooks.length === 0) {
    container.innerHTML = "";
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
    container.innerHTML = filteredBooks.map((book) => createBookCard(book)).join("");
  }
}

// Create HTML for a book card
function createBookCard(book) {
  return `
    <div class="book-card">
      <img 
        src="${book.image}" 
        alt="${book.title}" 
        class="book-image"
        onerror="this.src='public/placeholder.jpg'"
      >
      <div class="book-info">
        <span class="book-category">${book.category}</span>
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">by ${book.author}</p>
        <p class="book-price">$${book.price.toFixed(2)}</p>
        <button class="btn btn-primary" onclick="addToCart(${book.id})">
          Add to Cart
        </button>
      </div>
    </div>
  `;
}

// Handle search input
function handleSearch(event) {
  currentSearch = event.target.value;
  displayBooks();
}

// Handle category change
function handleCategoryChange(event) {
  currentCategory = event.target.value;
  displayBooks();
}

// Set up event listeners when page loads
document.addEventListener("DOMContentLoaded", () => {
  // Display all books initially
  displayBooks();

  // Add event listeners for filters
  document.getElementById("search").addEventListener("input", handleSearch);
  document.getElementById("category").addEventListener("change", handleCategoryChange);
});
