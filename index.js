Basim, [5/10/2025 2:13 AM]
// === Product Data ===
const products = [
  {
    id: 1,
    name: "Velvet Rose Sofa",
    price: 1200,
    image: "images/sofa1.jpg",
    description: "A luxurious velvet sofa in deep rose hue."
  },
  {
    id: 2,
    name: "Crystal Glass Chandelier",
    price: 850,
    image: "images/chandelier.jpg",
    description: "Elegant chandelier with Swarovski crystals."
  },
  {
    id: 3,
    name: "Modern Marble Coffee Table",
    price: 500,
    image: "images/table.jpg",
    description: "Minimalist design with real marble top."
  },
  {
    id: 4,
    name: "Silken Throw Pillows (Set of 4)",
    price: 120,
    image: "images/pillows.jpg",
    description: "Silky, smooth pillows in blush tones."
  }
];

// === Utility Functions ===
function getCart() {
  return JSON.parse(localStorage.getItem('cart'))  [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// === Add to Cart ===
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  alert(${product.name} added to cart!);
}

// === Render Products (on product.html) ===
function renderProducts() {
  const container = document.getElementById('product-container');
  if (!container) return;

  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = 
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>$${product.price}</strong></p>
      <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
    ;

    container.appendChild(card);
  });
}

// === Render Cart (on cart.html) ===
function updateCartDisplay() {
  const cartList = document.getElementById('cart-list');
  const totalEl = document.getElementById('total');

  if (!cartList  !totalEl) return;

  const cart = getCart();
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = 
      <span>${item.name}</span>
      <span>Price: $${item.price}</span>
      <span>Quantity: ${item.quantity}</span>
    ;
    cartList.appendChild(div);
    total += item.price * item.quantity;
  });

  totalEl.textContent = Total: $${total};
}

// === Checkout Button Handler ===
function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    alert('Your cart is empty!');
  } else {
    alert('Proceeding to checkout...');
    // Redirect to payment or confirmation here
  }
}

// === Init Calls ===
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();       // Only works on product.html
  updateCartDisplay();    // Only works on cart.html
});
