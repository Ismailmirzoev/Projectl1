async function loadOrders() {
    try {
        const response = await fetch('/api/orders');
        const orders = await response.json();
        const tbody = document.getElementById('orderBody');

        tbody.innerHTML = '';

        orders.forEach(order => {
            tbody.innerHTML += `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.customerName || 'Гость'}</td>
                    <td>${order.totalAmount}</td>
                    <td><span class="status">${order.status || 'PENDING'}</span></td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Ошибка загрузки заказов:", error);
    }
}

loadOrders();