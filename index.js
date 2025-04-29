document.addEventListener('DOMContentLoaded', () => {
  updateCartDisplay();
});

function addToCart(productId, productName, productPrice) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if product already exists
  const existingProduct = cart.find(item => item.productId === productId);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ productId, productName, productPrice, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${productName} has been added to your cart!`);
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartList = document.getElementById('cart-list');
  const totalElement = document.getElementById('total');

  if (!cartList || !totalElement) return; // not on cart page

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartList.innerHTML = '';

  let total = 0;

  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <span>${item.productName}</span>
      <span>Price: $${item.productPrice}</span>
      <span>Quantity: ${item.quantity}</span>
    `;
    cartList.appendChild(cartItem);

    total += item.productPrice * item.quantity;
  });

  totalElement.innerText = `Total: $${total}`;
}

function checkout() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length > 0) {
    alert('Proceeding to checkout!');
    // In real case, redirect to checkout page
  } else {
    alert('Your cart is empty!');
  }
}