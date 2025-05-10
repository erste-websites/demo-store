// === Product Data ===
const products = [
  {
    id: 1,
    name: "Velvet Rose Sofa",
    price: 1200,
    image: "images/sofa1.jpg",
    description: "A luxurious velvet sofa in deep rose hue.",
    category: "furniture"
  },
  {
    id: 2,
    name: "Crystal Glass Chandelier",
    price: 850,
    image: "images/chandelier.jpg",
    description: "Elegant chandelier with Swarovski crystals.",
    category: "lighting"
  },
  {
    id: 3,
    name: "Modern Marble Coffee Table",
    price: 500,
    image: "images/table.jpg",
    description: "Minimalist design with real marble top.",
    category: "furniture"
  },
  {
    id: 4,
    name: "Silken Throw Pillows (Set of 4)",
    price: 120,
    image: "images/pillows.jpg",
    description: "Silky, smooth pillows in blush tones.",
    category: "decor"
  }
];

// === Utility Functions ===
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
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
  alert(`${product.name} added to cart!`);
}

// === Render Products ===
function renderProducts() {
  const container = document.getElementById('products-container');
  const template = document.getElementById('product-template');
  if (!container || !template) return;

  products.forEach(product => {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector('.product-card');

    card.href = `product.html?id=${product.id}`;
    card.setAttribute('data-id', product.id);
    card.querySelector('.product-img').src = product.image;
    card.querySelector('.product-img').alt = product.name;
    card.querySelector('.product-title').textContent = product.name;
    card.querySelector('.product-price').textContent = `$${product.price}`;

    container.appendChild(clone);
  });
}

// === Render Cart ===
function updateCartDisplay() {
  const cartList = document.getElementById('cart-list');
  const totalEl = document.getElementById('total');

  if (!cartList || !totalEl) return;

  const cart = getCart();
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name}</span>
      <span>Price: $${item.price}</span>
      <span>Quantity: ${item.quantity}</span>
    `;
    cartList.appendChild(div);
    total += item.price * item.quantity;
  });

  totalEl.textContent = `Total: $${total}`;
}

// === Checkout ===
function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    alert('Your cart is empty!');
  } else {
    alert('Proceeding to checkout...');
    // Add checkout logic here
  }
}

// === Init ===
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartDisplay();
});
