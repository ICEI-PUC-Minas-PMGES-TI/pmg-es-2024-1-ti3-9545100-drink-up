document.addEventListener('DOMContentLoaded', function () {
    const token = sessionStorage.getItem('authorization');
    if (!token) {
        alert('Você não está autenticado. Por favor, faça login.');
        window.location.href = 'Login.html';
        return;
    }

    loadUsers();
    loadAllClients();
    document.getElementById('buscarTodosPedidos').addEventListener('click', loadAllOrders);
    document.getElementById('dataInput').addEventListener('change', filterOrdersByDate);
});

let clientsMap = {};

function loadAllClients() {
    fetch('http://localhost:3000/clientes', {
        method: 'GET',
        headers: {
            'Authorization': sessionStorage.getItem('authorization')
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar clientes: ' + response.statusText);
        }
        return response.json();
    })
    .then(clients => {
        clients.forEach(client => {
            clientsMap[client.id] = client;
        });
    })
    .catch(error => {
        console.error('Erro ao buscar clientes:', error);
    });
}

function loadUsers() {
    fetch('http://localhost:3000/clientes', {
        method: 'GET',
        headers: {
            'Authorization': sessionStorage.getItem('authorization')
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar clientes: ' + response.statusText);
        }
        return response.json();
    })
    .then(usuarios => {
        populateUserSelect(usuarios);
    })
    .catch(error => {
        console.error('Erro ao buscar usuários:', error);
    });
}

function populateUserSelect(usuarios) {
    const usuarioSelect = document.getElementById('usuarioSelect');
    usuarios.forEach(usuario => {
        const option = document.createElement('option');
        option.value = usuario.id;
        option.textContent = `${usuario.nome} (${usuario.email})`;
        usuarioSelect.appendChild(option);
    });

    usuarioSelect.addEventListener('change', function () {
        const userId = this.value;
        if (userId) {
            loadOrders(userId);
        }
    });
}

function loadOrders(userId) {
    fetch('http://localhost:3000/pedidos', {
        method: 'GET',
        headers: {
            'Authorization': sessionStorage.getItem('authorization')
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar histórico de compras: ' + response.statusText);
        }
        return response.json();
    })
    .then(orders => {
        const userOrders = orders.filter(order => order.id_cliente === parseInt(userId));
        displayOrders(userOrders);
    })
    .catch(error => {
        console.error('Erro ao buscar histórico de compras:', error);
    });
}

function loadAllOrders() {
    fetch('http://localhost:3000/pedidos', {
        method: 'GET',
        headers: {
            'Authorization': sessionStorage.getItem('authorization')
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar pedidos: ' + response.statusText);
        }
        return response.json();
    })
    .then(orders => {
        displayOrders(orders);
    })
    .catch(error => {
        console.error('Erro ao buscar pedidos:', error);
    });
}

function filterOrdersByDate() {
    const selectedDate = document.getElementById('dataInput').value;
    fetch('http://localhost:3000/pedidos', {
        method: 'GET',
        headers: {
            'Authorization': sessionStorage.getItem('authorization')
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar pedidos: ' + response.statusText);
        }
        return response.json();
    })
    .then(orders => {
        const filteredOrders = orders.filter(order => {
            const orderDate = new Date(order.data_criacao).toISOString().split('T')[0];
            return orderDate === selectedDate;
        });
        displayOrders(filteredOrders);
    })
    .catch(error => {
        console.error('Erro ao buscar pedidos:', error);
    });
}

function displayOrders(orders) {
    const tbody = document.getElementById('pedidos-tbody');
    tbody.innerHTML = '';

    orders.sort((a, b) => {
        const nameA = clientsMap[a.id_cliente] && clientsMap[a.id_cliente].nome ? clientsMap[a.id_cliente].nome.toUpperCase() : '';
        const nameB = clientsMap[b.id_cliente] && clientsMap[b.id_cliente].nome ? clientsMap[b.id_cliente].nome.toUpperCase() : '';
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return new Date(a.data_criacao) - new Date(b.data_criacao);
    });

    orders.forEach(order => {
        const cliente = clientsMap[order.id_cliente];
        const clienteNome = cliente ? cliente.nome : 'Desconhecido';
        const valorPedido = typeof order.valor_pedido === 'number' ? order.valor_pedido.toFixed(2) : 'N/A';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${order.data_criacao.split('T')[0]}</td>
            <td>${valorPedido}</td>
            <td>${clienteNome}</td>
            <td>
                <select onchange="updateOrderStatus(${order.id}, this.value)">
                    <option value="1" ${order.status_pedido === '1' ? 'selected' : ''}>Aguardando Pagamento</option>
                    <option value="2" ${order.status_pedido === '2' ? 'selected' : ''}>Pago</option>
                    <option value="3" ${order.status_pedido === '3' ? 'selected' : ''}>Entregue</option>
                    <option value="4" ${order.status_pedido === '4' ? 'selected' : ''}>Cancelado</option>
                </select>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function updateOrderStatus(orderId, status) {
    fetch(`http://localhost:3000/status_pedidos/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('authorization')
        },
        body: JSON.stringify({ status_pedido: status })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar o status do pedido: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Status do pedido atualizado:', data);
    })
    .catch(error => {
        console.error('Erro ao atualizar o status do pedido:', error);
    });
}