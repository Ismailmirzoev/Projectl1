document.addEventListener('DOMContentLoaded', () => {
    checkAuthAndPopulateHeader();
    loadDynamicProducts();
    setupEventListeners();
});

async function loadDynamicProducts() {
    try {
        const response = await fetch('http://localhost:8080/api/products');
        const products = await response.json();
        const container = document.querySelector('.vava');

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'divi1';
            card.innerHTML = `
                <img class="photo1" src="${product.imageUrl || ''}" data-id="${product.id}" style="cursor:pointer;">
                <p class="shop1">${product.name}</p>
                <p class="shop2">$${product.price}</p>
                <button class="btt1" data-id="${product.id}">Add to Cart</button>
                <button class="btt-details" data-id="${product.id}">Подробнее</button>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Не удалось подгрузить товары:", error);
    }
}

function setupEventListeners() {
    document.querySelector('.vava').addEventListener('click', (e) => {
        const productCard = e.target.closest('.divi1');
        if (!productCard) return;
        const productId = e.target.dataset.id || productCard.querySelector('.btt-details')?.dataset.id;

        const isOld = productCard.classList.contains('old-item');

        if (!productId) return;

        if (e.target.classList.contains('btt-details') || e.target.classList.contains('photo1')) {

            if (isOld) {
                window.location.href = `DetailsOfElements.html?id=${productId}`;
            } else {
                window.location.href = `DetailsOfNewElements.html?id=${productId}`;
            }
        }
        if (e.target.classList.contains('btt1')) {
            addToCart(productId);
        }
    });
}

async function addToCart(productId) {
    const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 })
    });
    if (res.ok) alert("Добавлено!");
}
async function checkAuthAndPopulateHeader() {
    try {
        const response = await fetch('/api/auth/me');
        const authContainer = document.getElementById('auth-status-container');
        if (response.ok && authContainer) {
            const user = await response.json();
            authContainer.innerHTML = `<span>👤 ${user.username}</span> <button onclick="globalLogout()">Выйти</button>`;
        }
    } catch (e) { console.error("Ошибка авторизации:", e); }
}

async function globalLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = 'login.html';
}
