document.getElementById('loginBtn').addEventListener('click', async function() {
    const username = document.getElementById('inp11').value;
    const password = document.getElementById('inp12').value;

    if (!username || !password) {
        alert("Заполните все поля!");
        return;
    }

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: username, // Теперь ключ совпадает с private String email в Java
                password: password
            })
        });

        if (response.ok) {
            alert("Успешный вход!");
            window.location.href = './index.html'; // Перенаправление на главную
        } else {
            const error = await response.text();
            alert("Ошибка входа: " + error);
        }
    } catch (err) {
        console.error("Ошибка:", err);
        alert("Ошибка соединения с сервером");
    }
});