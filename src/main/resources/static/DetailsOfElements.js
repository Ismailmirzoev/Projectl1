async function checkAuthAndPopulateHeader() {
    try {
        const response = await fetch('/api/auth/me');

        const authContainer = document.getElementById('auth-status-container');
        if (!authContainer) return;

        if (response.ok) {
            const user = await response.json();
            const displayName = user.username || user.firstName || 'Пользователь';

            authContainer.innerHTML = `
                <a href="user.html" style="text-decoration: none; font-weight: bold; color: #db4444; margin-left: 5px;">
                    👤 ${displayName}
                </a>
                <button onclick="globalLogout()" style="margin-left:10px; background:none; border:none; color:gray; cursor:pointer; font-family: inherit;">Выйти</button>
            `;
        } else {
            authContainer.innerHTML = `
                <a href="login.html" class="nav-link-auth" style="text-decoration: none; color: black;">Войти</a>
            `;
        }
    } catch (error) {
        console.error('Ошибка проверки сессии в шапке:', error);
    }
}

async function globalLogout() {
    try {
        await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
        window.location.href = 'login.html';
    } catch (e) {
        window.location.href = 'login.html';
    }
}

document.addEventListener('DOMContentLoaded', checkAuthAndPopulateHeader);
async function func2() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        console.error("ID товара не найден в URL");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/products/${productId}`);
        if (!response.ok) throw new Error("Товар не найден");

        const product = await response.json();

        document.querySelector('.photo2').src = product.imageUrl;
        document.querySelector('.pt1').textContent = product.name;
        document.querySelector('.pt2').textContent = `$${product.price}`;
        document.querySelector('.pt3').textContent = product.description;
        document.querySelector('.pt4').textContent = "В наличии: " + product.stockQuantity;

    } catch (error) {
        console.error("Ошибка загрузки деталей товара:", error);
    }
}
async function func2() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        console.error("ID товара не найден в URL!");
        return;
    }

    try {

        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) throw new Error("Товар не найден");

        const product = await response.json();

        document.querySelector('.photo2').src = product.imageUrl;
        document.querySelector('.pt1').innerText = product.name;
        document.querySelector('.pt2').innerText = `Price: ${product.price} $`;
        document.querySelector('.pt3').innerText = product.description;
        document.querySelector('.pt4').innerText = `Stock: ${product.stockQuantity} items`;

    } catch (error) {
        console.error("Ошибка при загрузке:", error);
    }
}

document.addEventListener('DOMContentLoaded', func2);
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch(`/api/products/${productId}`)
function func2() {
    const params = new URLSearchParams(window.location.search);
    const index = params.get("id");

    const productData = JSON.parse(localStorage.getItem(`product_${index}`));

    if (productData) {
        const photo2 = document.querySelector('.photo2');
        if (photo2) photo2.src = productData.imageUrl || productData.img1;

        const pt1 = document.querySelector('.pt1');
        if (pt1) pt1.innerText = productData.name || productData.name1;

        const pt2 = document.querySelector('.pt2');
        if (pt2) pt2.innerText = productData.price;

        const pt3 = document.querySelector('.pt3');
        if (pt3) pt3.innerText = productData.data1 || "Описание отсутствует";

        const pt4 = document.querySelector('.pt4');
        if (pt4) pt4.innerText = productData.raiting || "Нет рейтинга";
    } else {
        console.error("Товар не найден в localStorage");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const productData = localStorage.getItem('selectedProduct');
    if (productData) {
        const product = JSON.parse(productData);
        document.querySelector('.product-name').innerText = product.name;
        document.querySelector('.product-price').innerText = product.price;

    }
});
function loadProductFromStorage() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const productData = JSON.parse(localStorage.getItem(`product_${id}`));

    if (productData) {
        document.querySelector('.photo2').src = productData.imageUrl || productData.img1;
        document.querySelector('.pt1').innerText = productData.name || productData.name1;
        document.querySelector('.pt2').innerText = productData.price;
        document.querySelector('.pt3').innerText = productData.data1 || "Описание отсутствует";
        document.querySelector('.pt4').innerText = productData.raiting || "Нет рейтинга";
    } else {
        console.error("Товар не найден в localStorage");
        document.body.innerHTML = "<h1>Товар не найден</h1>";
    }
}

document.addEventListener('DOMContentLoaded', loadProductFromStorage);