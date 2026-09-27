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
    try {
        // 1. Получаем данные корзины с сервера
        const response = await fetch('/api/cart');
        if (!response.ok) throw new Error("Ошибка загрузки корзины");
        const items = await response.json();

        // 2. Считаем общую сумму
        // Если приходит массив, считаем сразу. Если объект с полем cartItems, берем его.
        const cartItems = Array.isArray(items) ? items : (items.cartItems || []);

        let totalAmount = 0;
        cartItems.forEach(item => {
            if (item.quantity > 0) {
                totalAmount += (item.product.price * item.quantity);
            }
        });

        // 3. Выводим результат в HTML
        // Мы ищем тег <span> внутри твоих <p> с классами su1 и su2
        const subtotalElements = document.querySelectorAll('.su1 span');
        const totalElements = document.querySelectorAll('.su2 span'); // Внимание на индекс

        // У тебя в HTML:
        // Subtotal -> .su1 span
        // Total -> .su2:nth-child(??) span (лучше дадим им ID)

        // ДАВАЙ ЛУЧШЕ ДОБАВИМ ID В HTML (смотри ниже),
        // но если не хочешь менять HTML, используем JS по классам:

        // Заполняем Subtotal (первый span в блоке su1)
        document.querySelector('.su1 span').innerText = totalAmount.toFixed(2);

        // Заполняем Total (второй блок su2, там где Total)
        // У тебя в HTML Total имеет класс su2. Найдем все su2 и возьмем последний
        const allSu2 = document.querySelectorAll('.su2');
        allSu2[allSu2.length - 1].querySelector('span').innerText = totalAmount.toFixed(2);

    } catch (error) {
        console.error("Ошибка:", error);
    }
}

async function index() {
    // Собираем данные из полей
    const orderData = {
        firstName: document.querySelector('.ll1:nth-of-type(1)').value, // Проверь правильность селекторов!
        lastName: document.querySelector('.ll1:nth-of-type(2)').value,
        address: document.querySelector('.ll1:nth-of-type(4)').value,
        // ... остальные поля
    };

    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            alert("Заказ успешно оформлен!");
            window.location.href = 'index.html';
        } else {
            // ВАЖНО: выводим ошибку от сервера, а не просто "Ошибка"
            const errorData = await response.text();
            console.error("Сервер ответил:", errorData);
            alert("Ошибка: " + errorData);
        }
    } catch (e) {
        console.error(e);
    }
}