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
