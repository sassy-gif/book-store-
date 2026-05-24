// ============================================
// CART PAGE FUNCTIONALITY
// This file handles the cart page display
// ============================================

// Display cart items
function displayCart() {
  const cart = getCart();
  const cartContent = document.getElementById("cart-content");
  const emptyCart = document.getElementById("empty-cart");
  const cartItems = document.getElementById("cart-items");

  // Show empty cart message if cart is empty
  if (cart.length === 0) {
    cartContent.style.display = "none";
    emptyCart.style.display = "block";
    return;
  }

  // Show cart content
  cartContent.style.display = "grid";
  emptyCart.style.display = "none";

  // Create HTML for each cart item
  cartItems.innerHTML = cart.map((item) => createCartItemHTML(item)).join("");

  // Update totals
  updateTotals();
}

// Create HTML for a cart item
function createCartItemHTML(item) {
  const itemTotal = (item.price * item.quantity).toFixed(2);
  
  return `
    <div class="cart-item">
      <img 
        src="${item.image}" 
        alt="${item.title}" 
        class="cart-item-image"
        onerror="this.src='public/placeholder.jpg'"
      >
      <div class="cart-item-details">
        <h3 class="cart-item-title">${item.title}</h3>
        <p class="cart-item-author">by ${item.author}</p>
        <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
        <p class="cart-item-subtotal">Subtotal: $${itemTotal}</p>
        <div class="cart-item-actions">
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)" aria-label="Decrease quantity">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)" aria-label="Increase quantity">+</button>
          </div>
          <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
        </div>
      </div>
    </div>
  `;
}

// Change item quantity
function changeQuantity(bookId, change) {
  updateQuantity(bookId, change);
  displayCart();
}

// Remove item from cart
function removeItem(bookId) {
  removeFromCart(bookId);
  displayCart();
}

// Update cart totals
function updateTotals() {
  const total = getCartTotal();
  document.getElementById("subtotal").textContent = `$${total.toFixed(2)}`;
  document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

// Run when page loads
document.addEventListener("DOMContentLoaded", displayCart);
