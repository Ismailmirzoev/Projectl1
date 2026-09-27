async function func2() {
    try {
        const response = await fetch('/api/auth/me');
        
        if (response.ok) {
            const user = await response.json();
            document.getElementById('span1').textContent = user.firstName || 'Имя не указано';
            document.getElementById('span2').textContent = user.lastName || 'Фамилия не указано';
            document.getElementById('span3').textContent = user.email || 'Email не указан';
            document.getElementById('span4').textContent = user.username || 'Юзернейм не указан';

            const authContainer = document.getElementById('auth-status-container');
            if (authContainer) {
                const displayName = user.username ? user.username : 'Гость';

                authContainer.innerHTML = `
                    <span style="font-weight: bold; color: #db4444; margin-left: 5px;">
                        👤 ${displayName}
                    </span>
                    <button onclick="logout()" style="margin-left:10px; background:none; border:none; color:gray; cursor:pointer;">Выйти</button>
                `;
            }
        } else {
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Ошибка получения профиля:', error);
    }
}

async function logout() {
    const response = await fetch('/logout', { method: 'POST' });
    if (response.ok || response.redirected) {
        window.location.href = 'login.html';
    }
}