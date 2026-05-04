// 1. Product data with categories
const products = [
    { id: 1, name: "1970 Wooden Radio", price: 250, category: "Radio", img: "https://images.unsplash.com/photo-1634314366269-ffc351943287?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, name: "Vintage Film Camera", price: 450, category: "Cameras", img: "https://images.unsplash.com/photo-1648005824243-b2eaa9677c8c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, name: "Vintage Color TV", price: 900, category: "TV", img: "https://images.unsplash.com/photo-1574974409771-cebec54deb00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D" },
    { id: 4, name: "Classic Rotary Phone", price: 180, category: "Phones", img: "https://images.unsplash.com/photo-1652964999467-91e0c97c5f71?q=80&w=469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
];

// 2. Filter products by category
function filterCategory(cat, btn) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.getElementById('search-input').value = "";

    if (cat === 'All') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === cat);
        renderProducts(filtered);
    }
}


let cart = [];

const productsList = document.getElementById('products-list');

products.forEach(pd => {
    productsList.innerHTML += `
        <div class="product-card">
            <img src="${pd.img}" alt="${pd.name}">
            <h3>${pd.name}</h3>
            <p>${pd.price} AED</p>
            <button class="action-btn" onclick="addToCart(${pd.id})">Add to Cart</button>
        </div>
    `;
});

function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = "";
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        cartItemsDiv.innerHTML += `
            <div style="display:flex; justify-content:space-between; margin:10px 0;">
                <span>${item.name}</span>
                <span>${item.price} AED <button onclick="removeFromCart(${index})" style="color:red; cursor:pointer; border:none; background:none;">[Delete]</button></span>
            </div>
        `;
    });
    document.getElementById('total-price').innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

function checkout() {
    if(cart.length === 0) return alert("Your cart is empty!");
    alert("Your order has been placed successfully at Retro Store!");
    cart = [];
    updateCartUI();
    toggleCart();
}
function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredProducts = products.filter(pd => 
        pd.name.toLowerCase().includes(searchTerm)
    );

    renderProducts(filteredProducts);
}

function renderProductsLegacy(productsToDisplay) {
    productsList.innerHTML = "";
    
    if (productsToDisplay.length === 0) {
        productsList.innerHTML = `<div class="no-results">Sorry.. We couldn't find this treasure in our warehouse! 📺</div>`;
        return;
    }

    productsToDisplay.forEach(pd => {
        productsList.innerHTML += `
            <div class="product-card">
                <img src="${pd.img}" alt="${pd.name}">
                <h3>${pd.name}</h3>
                <p>${pd.price} AED</p>
                <button class="action-btn" onclick="addToCart(${pd.id})">Add to Cart</button>
            </div>
        `;
    });
}

renderProducts(products);

let countDownDate = new Date().getTime() + (24 * 60 * 60 * 1000);

function updateTimer() {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    document.getElementById("countdown").innerHTML = hours + ":" + minutes + ":" + seconds;

    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById("countdown").innerHTML = "Offer Expired";
    }
}

let timerInterval = setInterval(updateTimer, 1000);
updateTimer();

function playClick() {
    const sound = document.getElementById('click-sound');
    sound.currentTime = 0;
    sound.play();
}

document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.closest('.cat-btn') || e.target.closest('.floating-cart')) {
        playClick();
    }
});

function renderProducts(productsToDisplay) {
    productsList.innerHTML = "";
    
    if (productsToDisplay.length === 0) {
        productsList.innerHTML = `<div class="no-results">Sorry.. We couldn't find this treasure! 📺</div>`;
        return;
    }

    productsToDisplay.forEach((pd, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
        card.style.opacity = '0';
        
        card.innerHTML = `
            <img src="${pd.img}" alt="${pd.name}">
            <h3 style="margin:10px 0;">${pd.name}</h3>
            <p style="font-weight:bold; color:var(--deep-red);">${pd.price} AED</p>
            <button class="action-btn" onclick="addToCart(${pd.id})">Buy Now</button>
        `;
        productsList.appendChild(card);
    });
}

const modal = document.getElementById('cart-modal');

window.onclick = function(event) {
    if (event.target == modal) {
        toggleCart();
    }
}
