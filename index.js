// Initialize cart from localStorage or create new one
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add product to the cart
function addToCart(productId, productName, productPrice) {
    const existingProductIndex = cart.findIndex(item => item.productId === productId);

    if (existingProductIndex !== -1) {
        // If product already in cart, increase quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // Else, add new product
        const product = { productId, productName, productPrice, quantity: 1 };
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to your cart!`);
    updateCartDisplay();
}

// Function to update cart display
function updateCartDisplay() {
    const cartList = document.getElementById('cart-list');
    const totalElement = document.getElementById('total');

    if (!cartList || !totalElement) {
        return; // Don't run if not on cart page
    }

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

    totalElement.innerHTML = `Total: $${total}`;
}

// Function to checkout
function checkout() {
    if (cart.length > 0) {
        alert('Proceeding to checkout...');
        // You can clear cart or redirect here
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    } else {
        alert('Your cart is empty!');
    }
}

// Update cart display on page load
document.addEventListener('DOMContentLoaded', updateCartDisplay);