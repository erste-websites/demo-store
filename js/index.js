const products = [
  {
    id: 1,
    name: "Luxury Chandelier",
    price: 1200,
    image: "https://via.placeholder.com/600x400",
    category: "lighting",
    description: "Elegant chandelier for upscale interiors.",
    details: "Crafted from premium crystal and brass."
  },
  {
    id: 2,
    name: "Velvet Armchair",
    price: 950,
    image: "https://via.placeholder.com/600x400",
    category: "furniture",
    description: "Comfortable and stylish velvet armchair.",
    details: "Solid wood frame with plush velvet finish."
  },
  {
    id: 3,
    name: "Gold Mirror",
    price: 450,
    image: "https://via.placeholder.com/600x400",
    category: "decor",
    description: "Ornate gold-framed mirror.",
    details: "Antique finish with detailed carving."
  }
];

// === Load Product Detail (on product.html) ===
function loadProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  const product = products.find(p => p.id === productId);

  const loadingEl = document.getElementById('product-loading');
  const errorEl = document.getElementById('product-error');

  if (!product) {
    loadingEl.style.display = 'none';
    errorEl.style.display = 'block';
    return;
  }

  document.getElementById('product-title-tag').textContent = product.name;
  document.getElementById('breadcrumb-name').textContent = product.name;
  document.getElementById('breadcrumb-category').textContent = capitalize(product.category);
  document.getElementById('breadcrumb-category').href = `shop.html?category=${product.category}`;

  document.getElementById('main-product-image').src = product.image;
  document.getElementById('product-title').textContent = product.name;
  document.getElementById('product-sku').textContent = `SKU: P-${product.id}`;
  document.getElementById('product-price').textContent = `Price: $${product.price}`;
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('product-details').textContent = product.details;

  const thumbContainer = document.getElementById('product-thumbnails');
  const template = document.getElementById('thumbnail-template');

  thumbContainer.innerHTML = '';
  const clone = template.content.cloneNode(true);
  clone.querySelector('.thumbnail img').src = product.image;
  clone.querySelector('.thumbnail').setAttribute('data-src', product.image);
  thumbContainer.appendChild(clone);

  const btn = document.getElementById('add-to-cart-btn');
  btn.onclick = () => {
    addToCart(product.id);
  };

  loadingEl.style.display = 'none';
}

// === Capitalize First Letter ===
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// === Add to Cart (placeholder) ===
function addToCart(id) {
  alert(`Product ${id} added to cart!`);
}

// === Tab Switching ===
function openTab(evt, tabName) {
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  const tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

// === Init ===
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('product.html')) {
    loadProductDetail();
  }
});
