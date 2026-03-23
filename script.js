// 1. تحديث بيانات المنتجات لتشمل الفئة
const products = [
    { id: 1, name: "راديو خشب 1970", price: 250, category: "راديو", img: "https://images.unsplash.com/photo-1634314366269-ffc351943287?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, name: "كاميرا فيلم قديمة", price: 450, category: "كاميرات", img: "https://images.unsplash.com/photo-1648005824243-b2eaa9677c8c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, name: "تلفاز صندوقي ملون", price: 900, category: "تلفاز", img: "https://images.unsplash.com/photo-1574974409771-cebec54deb00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D" },
    { id: 4, name: "هاتف قرص كلاسيكي", price: 180, category: "هواتف", img: "https://images.unsplash.com/photo-1652964999467-91e0c97c5f71?q=80&w=469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
];

// 2. دالة الفلترة حسب الفئة
function filterCategory(cat, btn) {
    // تغيير حالة الزر النشط (Active)
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // مسح خانة البحث عند اختيار فئة
    document.getElementById('search-input').value = "";

    if (cat === 'الكل') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === cat);
        renderProducts(filtered);
    }
}


let cart = [];

const productsList = document.getElementById('products-list');

// إنشاء الكروت برمجياً
products.forEach(pd => {
    productsList.innerHTML += `
        <div class="product-card">
            <img src="${pd.img}" alt="${pd.name}">
            <h3>${pd.name}</h3>
            <p>${pd.price} درهم</p>
            <button class="action-btn" onclick="addToCart(${pd.id})">أضف للسلة</button>
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
                <span>${item.price} ر.س <button onclick="removeFromCart(${index})" style="color:red; cursor:pointer; border:none; background:none;">[حذف]</button></span>
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
    if(cart.length === 0) return alert("سلتك فارغة!");
    alert("تم تسجيل طلبك بنجاح في متجر Retro Store!");
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

// تعديل طريقة عرض المنتجات لتصبح مرنة
function renderProducts(productsToDisplay) {
    productsList.innerHTML = "";
    
    if (productsToDisplay.length === 0) {
        productsList.innerHTML = `<div class="no-results">عذراً.. لم نجد هذا الكنز في مخزننا! 📺</div>`;
        return;
    }

    productsToDisplay.forEach(pd => {
        productsList.innerHTML += `
            <div class="product-card">
                <img src="${pd.img}" alt="${pd.name}">
                <h3>${pd.name}</h3>
                <p>${pd.price} درهم</p>
                <button class="action-btn" onclick="addToCart(${pd.id})">أضف للسلة</button>
            </div>
        `;
    });
}

// استدعاء العرض الأولي عند تشغيل الصفحة
renderProducts(products);
// تحديد وقت نهاية العرض (بعد 24 ساعة من الآن كمثال)
let countDownDate = new Date().getTime() + (24 * 60 * 60 * 1000);

function updateTimer() {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    // حساب الساعات والدقائق والثواني
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // إضافة صفر على اليسار إذا كان الرقم أقل من 10
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    document.getElementById("countdown").innerHTML = hours + ":" + minutes + ":" + seconds;

    // إذا انتهى الوقت
    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById("countdown").innerHTML = "انتهى العرض";
    }
}

// تحديث العداد كل ثانية واحدة
let timerInterval = setInterval(updateTimer, 1000);
updateTimer(); // استدعاء أولي لتجنب التأخير ثانية واحدة
// دالة تشغيل الصوت
function playClick() {
    const sound = document.getElementById('click-sound');
    sound.currentTime = 0; // لإعادة الصوت للبداية إذا ضغط المستخدم بسرعة
    sound.play();
}

// ربط الصوت بجميع الأزرار في الموقع تلقائياً
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.closest('.cat-btn') || e.target.closest('.floating-cart')) {
        playClick();
    }
});
// إضافة وظيفة التحريك عند ظهور المنتجات
function renderProducts(productsToDisplay) {
    productsList.innerHTML = "";
    
    if (productsToDisplay.length === 0) {
        productsList.innerHTML = `<div class="no-results">عذراً.. لم نجد هذا الكنز! 📺</div>`;
        return;
    }

    productsToDisplay.forEach((pd, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        // إضافة تأخير بسيط لكل كرت ليعطي حركة متسلسلة (Stagger animation)
        card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
        card.style.opacity = '0';
        
        card.innerHTML = `
            <img src="${pd.img}" alt="${pd.name}">
            <h3 style="margin:10px 0;">${pd.name}</h3>
            <p style="font-weight:bold; color:var(--deep-red);">${pd.price} درهم</p>
            <button class="action-btn" onclick="addToCart(${pd.id})">اشتري الآن</button>
        `;
        productsList.appendChild(card);
    });
}

// أضف هذا الأنميشن لملف الـ CSS أيضاً
/*
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
*/
// استهداف نافذة السلة (الخلفية السوداء)
const modal = document.getElementById('cart-modal');

// إضافة مستمع نقرات على النافذة بالكامل
window.onclick = function(event) {
    // التحقق: هل العنصر الذي تم النقر عليه هو "الخلفية السوداء" نفسها؟
    if (event.target == modal) {
        toggleCart(); // استدعاء دالة الإغلاق التي برمجناها سابقاً
    }
}
