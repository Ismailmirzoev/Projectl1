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
async function sendMessage() {
    const name = document.querySelector('.divvv2 input[placeholder="Your Name *"]').value;
    const email = document.querySelector('.divvv2 input[placeholder="Your Email *"]').value;
    const message = document.querySelector('.ta1').value;

    const contactData = {
        name: name,
        email: email,
        message: message
    };

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });

        if (response.ok) {
            alert("Сообщение успешно отправлено!");
            // Очистка формы
            document.querySelector('.divvv2').reset();
        } else {
            alert("Ошибка при отправке сообщения.");
        }
    } catch (error) {
        console.error("Ошибка:", error);
        alert("Не удалось связаться с сервером.");
    }
}