// ============================================
// HOME PAGE FUNCTIONALITY
// This file handles the home page features
// ============================================

// Display featured books on the home page
function displayFeaturedBooks() {
  const container = document.getElementById("featured-books");
  const featuredBooks = getFeaturedBooks();

  container.innerHTML = featuredBooks.map((book) => createBookCard(book)).join("");
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

// Run when page loads
document.addEventListener("DOMContentLoaded", displayFeaturedBooks);
