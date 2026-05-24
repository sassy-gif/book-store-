// ============================================
// CART FUNCTIONALITY
// This file handles all shopping cart operations
// ============================================

// Get cart from localStorage or create empty array
function getCart() {
  const cart = localStorage.getItem("bookstore-cart");
  return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("bookstore-cart", JSON.stringify(cart));
  updateCartCount();
}

// Add a book to the cart
function addToCart(bookId) {
  const cart = getCart();
  const book = getBookById(bookId);

  if (!book) {
    console.error(`Book with ID ${bookId} not found`);
    return;
  }

  // Check if book is already in cart
  const existingItem = cart.find((item) => item.id === bookId);

  if (existingItem) {
    // Increase quantity if already in cart
    existingItem.quantity += 1;
  } else {
    // Add new item to cart
    cart.push({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image,
      quantity: 1,
    });
  }

  saveCart(cart);
  showCartNotification(`"${book.title}" has been added to your cart!`);
}

// Remove a book from the cart
function removeFromCart(bookId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== bookId);
  saveCart(cart);
}

// Update quantity of a book in the cart
function updateQuantity(bookId, change) {
  const cart = getCart();
  const item = cart.find((item) => item.id === bookId);

  if (item) {
    item.quantity += change;

    // Remove item if quantity is 0 or less
    if (item.quantity <= 0) {
      removeFromCart(bookId);
      return;
    }

    saveCart(cart);
  }
}

// Get total number of items in cart
function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Get cart total price
function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Update cart count display in navigation
function updateCartCount() {
  const countElements = document.querySelectorAll("#cart-count");
  const count = getCartCount();

  countElements.forEach((element) => {
    element.textContent = count;
  });
}

// Show cart notification (improved UX)
function showCartNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.textContent = message;
  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => notification.classList.add('show'), 10);

  // Hide and remove notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Checkout function
function checkout() {
  const cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = getCartTotal().toFixed(2);
  const itemCount = getCartCount();
  
  alert(
    `Thank you for your order!\n\n` +
    `Items: ${itemCount}\n` +
    `Total: $${total}\n\n` +
    `This is a demo - no actual purchase was made.`
  );

  // Clear the cart after checkout
  saveCart([]);

  // Reload the page to show empty cart
  location.reload();
}

// Update cart count when page loads
document.addEventListener("DOMContentLoaded", updateCartCount);
