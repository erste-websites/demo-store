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

// === Capitalize First Letter ===
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// === Home Page: Render Products ===
function renderProducts(filter = "all") {
  const container = document.getElementById("products-container");
  const template = document.getElementById("product-template");

  if (!container || !template) return;

  container.innerHTML = "";

  const filteredProducts = filter === "all"
    ? products
    : products.filter(p => p.category === filter);

  filteredProducts.forEach(product => {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector(".product-card");
    const img = clone.querySelector(".product-img");
    const title = clone.querySelector(".product-title");
    const price = clone.querySelector(".product-price");

    card.href = `product.html?id=${product.id}`;
    card.setAttribute("data-id", product.id);
    img.src = product.image;
    img.alt = product.name;
    title.textContent = product.name;
    price.textContent = `$${product.price}`;

    container.appendChild(clone);
  });
}

// === Product Page: Load Product Detail ===
function loadProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  const product = products.find(p => p.id === productId);

  const loadingEl = document.getElementById('product-loading');
  const errorEl = document.getElementById('product-error');

  if (!product) {
    if (loadingEl) loadingEl.style.display = 'none';
    if (errorEl) errorEl.style.display = 'block';
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
  if (thumbContainer && template) {
    thumbContainer.innerHTML = "";
    const thumb = template.content.cloneNode(true);
    thumb.querySelector("img").src = product.image;
    thumb.querySelector(".thumbnail").dataset.src = product.image;
    thumbContainer.appendChild(thumb);
  }

  document.getElementById('add-to-cart-btn').onclick = () => {
    alert(`Product ${product.id} added to cart!`);
  };

  loadingEl.style.display = 'none';
}

// === Tab Switching (for product.html) ===
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
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("products-container")) {
    renderProducts();

    document.querySelectorAll(".category-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderProducts(btn.dataset.category);
      });
    });
  }

  if (window.location.pathname.includes("product.html")) {
    loadProductDetail();
  }
});
