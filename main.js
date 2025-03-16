// Cart Data
let cart = [];

// Function to Add Product to Cart
function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    updateCart();
}

// Function to Update Cart Display
function updateCart() {
    let cartContainer = document.getElementById("cart-items");
    let totalContainer = document.getElementById("cart-total");
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let listItem = document.createElement("li");
        listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartContainer.appendChild(listItem);
        total += item.price;
    });

    totalContainer.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to Checkout (Triggers Email Collection)
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    document.getElementById("checkout-form").style.display = "block";
}

// Function to Handle Email Submission (For Cart Recovery)
function submitEmail() {
    let emailInput = document.getElementById("email").value;
    if (emailInput === "") {
        alert("Please enter your email.");
        return;
    }
    
    alert(`Thank you! If you leave items in your cart, we'll remind you via email: ${emailInput}`);

    // Simulate Sending Data to Backend (Replace with actual API)
    console.log(`Cart Recovery Email Captured: ${emailInput}`);

    // Reset Form
    document.getElementById("checkout-form").style.display = "none";
    document.getElementById("email").value = "";
}

// FAQ Bot Integration (Simulating Lyro Responses)
function askBot() {
    let userQuestion = document.getElementById("bot-question").value.toLowerCase();
    let botResponse = document.getElementById("bot-response");

    let responses = {
        "shipping": "We offer free worldwide shipping on orders over $50!",
        "returns": "We accept returns within 30 days of purchase.",
        "discount": "Use code 'WELCOME10' for 10% off your first order!",
        "products": "We offer high-quality pet accessories, toys, and premium food."
    };

    let foundResponse = Object.keys(responses).find(key => userQuestion.includes(key));
    botResponse.textContent = foundResponse ? responses[foundResponse] : "I'm not sure, but our team can help!";
}
