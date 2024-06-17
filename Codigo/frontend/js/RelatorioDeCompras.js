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
  const token = sessionStorage.getItem('authorization');
  
  fetch('http://localhost:3000/pedidos', {
    method: 'GET',
    headers: {
      'Authorization': token
    }
  })
  .then(response => response.json())
  .then(orders => {
    
    const userOrders = orders.filter(order => order.id_cliente === parseInt(sessionStorage.getItem("cliente_id")));

    displayOrders(userOrders);
  })
  .catch(error => {
    console.error('Error loading orders:', error);
  });
}

function displayOrders(orders) {
  // Ordenar os pedidos pela data de criação (mais recente primeiro)
  orders.sort((a, b) => {
    const dateA = new Date(a.data_criacao);
    const dateB = new Date(b.data_criacao);
    return dateB - dateA; // Ordenação decrescente
  });

  const tbody = document.getElementById('pedidos-tbody');
  tbody.innerHTML = ''; 

  orders.forEach(order => {
    // Converter a data para o formato desejado (dd/mm/aaaa - hora:minuto)
    const dataPedido = new Date(order.data_criacao);
    const dia = dataPedido.getDate().toString().padStart(2, '0');
    const mes = (dataPedido.getMonth() + 1).toString().padStart(2, '0'); // Mês começa em 0
    const ano = dataPedido.getFullYear();
    const hora = dataPedido.getHours().toString().padStart(2, '0');
    const minuto = dataPedido.getMinutes().toString().padStart(2, '0');
    const dataFormatada = `${dia}/${mes}/${ano} - ${hora}:${minuto}`;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${dataFormatada}</td>
      <td>${order.valor_pedido}</td>
      <td>${order.status_pedido}</td>
      <td><button class="btn-visualizar" onclick="visualizarDetalhes(${order.id})">Visualizar</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function visualizarDetalhes(orderId) {
  const token = sessionStorage.getItem('authorization');
  
  fetch(`http://localhost:3000/pedidos/listarItensDoPedido/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
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
  let tableHtml = `
    <table>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
  `;

  orderDetails.forEach(details => {
    tableHtml += `
      <tr>
        <td>${details.nomeProduto}</td>
        <td>${details.quantidadeProduto}</td>
        <td>R$ ${details.valorProduto}</td>
      </tr>
    `;
  });

  tableHtml += `</tbody></table>`;
  popupContent.innerHTML = tableHtml; // Atualize o conteúdo do popup

  const fecharButton = document.createElement('button');
  fecharButton.textContent = 'Fechar';
  fecharButton.onclick = fecharPopup;
  popupContent.appendChild(fecharButton);

  const popup = document.getElementById('detalhesPedidoPopup');
  popup.style.display = 'block';
}

function fecharPopup() {
  const popup = document.getElementById('detalhesPedidoPopup');
  popup.style.display = 'none';
  popup.querySelector('.popup-content').innerHTML = `
    <span class="close-popup" onclick="fecharPopup()">&times;</span>
    <h4>Detalhes do Pedido</h4>
  `;
}
