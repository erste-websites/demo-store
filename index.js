let cart = [];

function addToCart(productId, productName, productPrice) {
  const product = { productId, productName, productPrice, quantity: 1 };
  cart.push(product);
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartList = document.getElementById('cart-list');
  cartList.innerHTML = '';
  
  let total = 0;

  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <span>${item.productName}</span>
      <span>$${item.productPrice}</span>
      <span>Quantity: ${item.quantity}</span>
    `;
    cartList.appendChild(cartItem);
    total += item.productPrice * item.quantity;
  });

  const totalElement = document.getElementById('total');
  totalElement.innerHTML = `Total: $${total}`;
}

function checkout() {
  if (cart.length > 0) {
    alert('Proceeding to checkout');
  } else {
    alert('Your cart is empty!');
  }
}

// Initialize an empty cart in localStorage if it's not already there
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Function to add product to the cart
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.push({ name: productName, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${productName} has been added to your cart!`);
}

// Example of how to link the Add to Cart button in HTML
// <button class="btn" onclick="addToCart('Crystal Chandelier', 2500)">Add to Cart</button>

