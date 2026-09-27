document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Ошибка сети');

        const products = await response.json();
        const tbody = document.getElementById('products-table-body');
        tbody.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name || '—'}</td>
                <td>—</td> <td>${product.category ? product.category.name : 'Без категории'}</td>
                <td>
                    <img src="${product.imageUrl || ''}" alt="Product" style="width: 50px; height: auto; border-radius: 4px;" onerror="this.src='https://placehold.co/50x50?text=No+Img'">
                </td>
                <td>${product.price ? product.price + ' $' : '0 $'}</td>
                <td>${product.stockQuantity !== undefined ? product.stockQuantity + ' шт.' : '0 шт.'}</td>
                <td>
                    <button onclick="editProduct(${product.id})" style="background:#ffc107; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">✏️</button>
                    <button onclick="deleteProduct(${product.id})" style="background:#dc3545; border:none; padding:5px 10px; border-radius:4px; color:white; cursor:pointer; margin-left:5px;">🗑️</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        document.getElementById('error-msg').style.display = 'block';
    }
}

function editProduct(id) {
    window.location.href = `newproduct.html?id=${id}`;
}

async function deleteProduct(id) {
    if (confirm('Вы уверены, что хотите удалить этот товар?')) {
        const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Товар успешно удален!');
            loadProducts();
        } else {
            alert('Не удалось удалить товар');
        }
    }
}
async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Ошибка сети');

        const products = await response.json();
        const tbody = document.getElementById('products-table-body');
        tbody.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name || '—'}</td>
                <td>—</td>
                <td>${product.category ? (product.category.name || 'Категория ' + product.category.id) : 'Без категории'}</td>
                <td>
                    <img src="${product.imageUrl || ''}" alt="Product" style="width: 50px; height: auto; border-radius: 4px;" onerror="this.src='https://placehold.co/50x50?text=No+Img'">
                </td>
                <td>${product.price ? product.price + ' $' : '0 $'}</td>
                <td>0</td>
                <td>
                    <button onclick="editProduct(${product.id})" style="background:#ffc107; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">✏️</button>
                    <button onclick="deleteProduct(${product.id})" style="background:#dc3545; border:none; padding:5px 10px; border-radius:4px; color:white; cursor:pointer; margin-left:5px;">🗑️</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        document.getElementById('error-msg').style.display = 'block';
    }
}