
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
            throw new Error('ERRO');
        }
        return response.json();
    })
    .then(orders => {
        displayOrders(orders);
    })
    .catch(error => {
        console.error('ERRO');
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
            
            throw new Error('ERRO');
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

        console.error('ERRO');

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
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${order.data_criacao.split('T')[0]}</td>
            <td>${order.valor_pedido}</td>
            <td>${clienteNome}</td>
        `;
        tbody.appendChild(tr);
    });
}

function visualizarDetalhes(orderId) {

    fetch(`http://localhost:3000/pedidos/${orderId}`, {
        method: 'GET',
        headers: {
            'Authorization': sessionStorage.getItem('authorization')
        }
    })
    .then(response => response.json())
    .then(orderDetails => {
        displayOrderDetails(orderDetails);
    })
    .catch(error => {
        console.error('Erro ao buscar detalhes do pedido:', error);
    });
}

function displayOrderDetails(orderDetails) {

    const popupContent = document.querySelector('.popup-content');
    popupContent.innerHTML = `
        <span class="close-popup" onclick="fecharPopup()">&times;</span>
        <h4>Detalhes do Pedido</h4>
        <table>
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${orderDetails.itens.map(item => `
                    <tr>
                        <td>${item.produto}</td>
                        <td>${item.quantidade}</td>
                        <td>R$ ${item.total}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    const popup = document.getElementById('detalhesPedidoPopup');
    popup.style.display = 'block';
}

function fecharPopup() {

    const popup = document.getElementById('detalhesPedidoPopup');
    popup.style.display = 'none';
    popup.querySelector('.popup-content').innerHTML = '';
}
