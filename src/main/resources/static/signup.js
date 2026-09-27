document.addEventListener('DOMContentLoaded', () => {
    console.log('=== Скрипт signup.js запущен и готов к работе! ===');

    const signupForm = document.querySelector('form');

    if (!signupForm) {
        console.error('Ошибка: Форма регистрации не найдена!');
        return;
    }

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            const inputs = signupForm.querySelectorAll('input');

            console.log('Найдено инпутов в форме:', inputs.length);

            const firstName = inputs[0] ? inputs[0].value.trim() : '';
            const lastName  = inputs[1] ? inputs[1].value.trim() : '';
            const email     = inputs[2] ? inputs[2].value.trim() : '';
            const username  = inputs[3] ? inputs[3].value.trim() : '';
            const password  = inputs[4] ? inputs[4].value : '';
            const role      = 'CUSTOMER';

            console.log('Считанные данные из формы:', { firstName, lastName, email, username });

            if (!username || !firstName || !lastName || !email || !password) {
                alert('Пожалуйста, заполните все поля формы! Какое-то из полей считалось пустым.');
                return;
            }

            const payload = { username, email, password, firstName, lastName, role };

            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Регистрация прошла успешно!');
                window.location.href = 'login.html';
            } else {
                const message = await response.text();
                alert(`Ошибка регистрации: ${message}`);
            }
        } catch (error) {
            console.error('Сетевая ошибка:', error);
            alert('Не удалось связаться с сервером.');
        }
    });
});