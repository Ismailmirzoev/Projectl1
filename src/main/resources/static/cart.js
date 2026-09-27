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
async function functt2() {
    try {
        const response = await fetch('/api/cart');
        const items = await response.json();
        console.log("Данные корзины:", items);

        const tbody = document.querySelector('.tbody');
        if (!tbody) return;

        tbody.innerHTML = '';

        items.forEach(item => {
            console.log("Объект item:", item);

            const name = item.product ? item.product.name : "Товар";
            const price = item.product ? item.product.price : 0;
            const qty = item.quantity || 1;

            const itemId = item.id;

            tbody.innerHTML += `
                <tr>
                    <td><img src="${item.product.imageUrl}" width="50"></td>
                    <td>${name}</td>
                    <td>$${price}</td>
                    <td>
                        <input type="number" value="${qty}" min="1"
                               onchange="updateQuantity(${itemId}, this.value)"
                               style="width: 50px;">
                    </td>
                    <td>$${(price * qty).toFixed(2)}</td>
                    <td><button onclick="removeItem(${itemId})">Удалить</button></td>
                </tr>
            `;
        });
    } catch (e) {
        console.error("Ошибка в JS:", e);
    }
}

//async function functt2() {
//    const response = await fetch('/api/cart/items');
//    const items = await response.json();
//    const tbody = document.querySelector('.tbody');
//    tbody.innerHTML = '';
//
//    items.forEach(item => {
//        tbody.innerHTML += `
//            <tr>
//                <td><img src="${item.imageUrl}" width="50"></td>
//                <td>${item.productName}</td>
//                <td>${item.price} $</td>
//                <td>
//                    <input type="number" value="${item.quantity}"
//                           onchange="updateQuantity(${item.id}, this.value)">
//                </td>
//                <td>${item.price * item.quantity} $</td>
//                <td><button onclick="funcc1(${item.id})">Удалить</button></td>
//            </tr>
//        `;
//    });
//}
// Основная функция загрузки корзины
async function loadCart() {
    try {
        const response = await fetch('/api/cart');
        if (!response.ok) throw new Error("Ошибка сервера");

        const data = await response.json();

        // ВАЖНО: проверяем, где лежит массив товаров.
        // Если data — это массив, используем его. Если объект с полем, берем это поле.
        const items = Array.isArray(data) ? data : (data.cartItems || []);

        const tbody = document.querySelector('.tbody');
        if (!tbody) return;
        tbody.innerHTML = '';

        let totalAmount = 0;

        items.forEach(item => {
            // Если quantity 0, просто пропускаем
            if (!item.quantity || item.quantity <= 0) return;

            // Используем ID продукта (как мы выяснили ранее)
            const itemId = item.product.id;
            const subtotal = item.product.price * item.quantity;
            totalAmount += subtotal;

            tbody.innerHTML += `
                <tr>
                    <td><img src="${item.product.imageUrl}" width="50"></td>
                    <td>${item.product.name}</td>
                    <td>$${item.product.price}</td>
                    <td>
                        <input type="number" value="${item.quantity}" min="1"
                               onchange="updateQuantity(${itemId}, this.value)">
                    </td>
                    <td>$${subtotal.toFixed(2)}</td>
                    <td><button onclick="removeFromCart(${itemId})">Удалить</button></td>
                </tr>
            `;
        });

        // Обновляем итоговую сумму (убедись, что эти ID есть в HTML)
        const subtotalEl = document.getElementById('subtotal-value');
        const totalEl = document.getElementById('total-value');
        if (subtotalEl) subtotalEl.innerText = `$${totalAmount.toFixed(2)}`;
        if (totalEl) totalEl.innerText = `$${totalAmount.toFixed(2)}`;

    } catch (error) {
        console.error("Ошибка загрузки корзины:", error);
    }
}

async function removeFromCart(itemId) {
    try {
        const response = await fetch(`/api/cart/remove/${itemId}`, { method: 'DELETE' });
        if (response.ok) {
            loadCart();
        } else {
            alert("Ошибка при удалении");
        }
    } catch (err) {
        console.error("Ошибка:", err);
    }
}

async function updateQuantity(itemId, newQuantity) {
    try {
        const response = await fetch(`/api/cart/update/${itemId}?quantity=${newQuantity}`, { method: 'POST' });
        if (response.ok) {
            loadCart();
        } else {
            alert("Ошибка обновления");
        }
    } catch (err) {
        console.error("Ошибка сети:", err);
    }
}

document.addEventListener('DOMContentLoaded', loadCart);