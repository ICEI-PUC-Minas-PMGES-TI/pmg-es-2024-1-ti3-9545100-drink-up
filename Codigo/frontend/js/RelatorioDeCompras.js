document.addEventListener('DOMContentLoaded', function () {
    const token = sessionStorage.getItem('authorization');
    if (!token) {
      alert('Você não está autenticado. Por favor, faça login.');
      window.location.href = 'Login.html';
      return;
    }
  
    loadOrders();
  });
  
  function loadOrders() {
    fetch('http://localhost:3000/pedidos', {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    })
    .then(response => response.json())
    .then(orders => {
      displayOrders(orders);
    })
    .catch(error => {
      console.error('Error loading orders:', error);
    });
  }
  
  function displayOrders(orders) {
    const tbody = document.getElementById('pedidos-tbody');
    tbody.innerHTML = '';
  
    orders.forEach(order => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${order.data_criacao}</td>
        <td>${order.valor_pedido}</td>
        <td><button class="btn-visualizar" onclick="visualizarDetalhes(this, ${order.id})">Visualizar</button></td>
      `;
      tbody.appendChild(tr);
    });
  }
  
  function visualizarDetalhes(button, orderId) {
    fetch(`http://localhost:3000/pedidos/${orderId}`, {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    })
    .then(response => response.json())
    .then(orderDetails => {
      displayOrderDetails(orderDetails);
    })
    .catch(error => {
      console.error('Error loading order details:', error);
    });
  }
  
  function displayOrderDetails(orderDetails) {
    const popupContent = document.querySelector('.popup-content');
    popupContent.innerHTML = `
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
    popup.querySelector('.popup-content').innerHTML =
      '<span class="close-popup" onclick="fecharPopup()">&times;</span><h4>Detalhes do Pedido</h4>';
  }