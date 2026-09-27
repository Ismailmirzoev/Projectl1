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
document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) return;

    try {
        const response = await fetch(`/api/products/${productId}`);
        const product = await response.json();

        document.querySelector('.product-name').innerText = product.name;
        document.querySelector('.product-price').innerText = `$${product.price}`;
        document.querySelector('.product-img').src = product.imageUrl;
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }

    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', async function() {
            try {
                const response = await fetch(`/api/cart/add?productId=${productId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.ok) {
                    alert("Товар успешно добавлен в корзину!");
                } else {
                    alert("Ошибка добавления: " + await response.text());
                }
            } catch (err) {
                console.error("Ошибка сети:", err);
            }
        });
    }
});
async function loadProductFromApi() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        console.error("ID товара не найден в URL!");
        return;
    }

    try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) throw new Error("Товар не найден на сервере");

        const product = await response.json();

        document.querySelector('.photo2').src = product.imageUrl;
        document.querySelector('.pt1').innerText = product.name;
        document.querySelector('.pt2').innerText = `$${product.price}`;
        document.querySelector('.pt3').innerText = product.description || "Описание отсутствует";
        document.querySelector('.pt4').innerText = `В наличии: ${product.stockQuantity}`;

    } catch (error) {
        console.error("Ошибка при загрузке:", error);
        alert("Не удалось загрузить товар.");
    }
}

document.addEventListener('DOMContentLoaded', loadProductFromApi);