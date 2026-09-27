document.addEventListener('DOMContentLoaded', async () => {
    console.log('=== Скрипт проверки сессии успешно запущен! ===');

    const authContainer = document.getElementById('auth-status-container');
    const loginBtn = document.getElementById('login-btn');

    if (!authContainer) {
        console.warn('Контейнер auth-status-container не найден на этой странице. Проверь HTML!');
        return;
    }

    try {
        const response = await fetch('/api/auth/me', { credentials: 'include' });

        if (response.ok) {
            const user = await response.json();
            console.log('Пользователь авторизован:', user);

            const displayName = user.firstName || user.email.split('@')[0];

            if (loginBtn) {
                loginBtn.innerHTML = `👤 Привет, <strong>${displayName}</strong>`;
                loginBtn.href = '#';
                loginBtn.style.cursor = 'default';
            }

            const logoutBtn = document.createElement('a');
            logoutBtn.href = '#';
            logoutBtn.className = 'btn-logout';
            logoutBtn.textContent = 'Выйти';

            logoutBtn.onclick = async (e) => {
                e.preventDefault();
                await fetch('/logout', { method: 'POST' }).catch(() => {});
                window.location.href = 'login.html';
            };

            authContainer.appendChild(logoutBtn);
        } else {
            console.log('Пользователь не залогинен (гость). Оставляем стандартную кнопку Войти.');
        }
    } catch (error) {
        console.error('Ошибка при проверке сессии:', error);
    }
});
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

async function on1() {
    if (productId) {
        const titleEl = document.querySelector('.cr1');
        if (titleEl) titleEl.textContent = 'Edit Product';

        try {
            const response = await fetch(`/api/products/${productId}`);
            if (response.ok) {
                const product = await response.json();

                document.getElementById('inp10').value = product.name || '';
                document.getElementById('inp12').value = product.category ? product.category.id : '1';
                document.getElementById('inp13').value = product.description || '';
                document.getElementById('inp14').value = product.price || '';
                document.getElementById('inp15').value = product.imageUrl || '';

                func3();
            }
        } catch (error) {
            console.error('Ошибка загрузки товара:', error);
        }
    }
}

async function func1() {
    const payload = {
        name: document.getElementById('inp10').value.trim(),
        description: document.getElementById('inp13').value.trim(),
        price: parseFloat(document.getElementById('inp14').value) || 0,
        imageUrl: document.getElementById('inp15').value.trim(),
        stockQuantity: 10,
        category: { id: parseInt(document.getElementById('inp12').value) || 1 },
        seller: { id: 1 }
    };
    const modelVal = document.getElementById('inp11').value.trim();
    if (modelVal) {
        payload.name += ' ' + modelVal;
    }

    const url = productId ? `/api/products/${productId}` : '/api/products';
    const method = productId ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert(productId ? 'Товар успешно изменен!' : 'Товар успешно создан!');
            window.location.href = 'products.html';
        } else {
            alert('Ошибка сохранения товара на бэкенде');
        }
    } catch (error) {
        console.error('Ошибка отправки:', error);
    }
}

function func2() {
    window.location.href = 'products.html';
}

function func3() {
    const url = document.getElementById('inp15').value;
    const img = document.querySelector('.image1');
    if (img) {
        img.src = url;
        img.style.width = '150px';
        img.style.height = 'auto';
    }
}