import { Carrinho } from "./utils/Carrinho.js";

document.addEventListener("DOMContentLoaded", async function () {
  const carrinho = new Carrinho();

  const products = carrinho.carregarProdutosDoCookie();
  
  for (let element of products) {
    try {
        const response = await fetch(`http://localhost:3000/imagens/${element.imagem}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        element.image = data.caminho;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
  }

  let carrinhoHTML = '';
  for (const element of products) {
    carrinhoHTML += `
        <tr>
        <td class="espaco-imagem"><img src="${element.image}" alt="Produto" class="product-image"></td>
            <td>${element.nome}</td>
            <td id="item-value">R$ ${element.valor}</td>
            <td>
                <div class="quantity-buttons">
                    <span class="quantity" id="quantity${element.id}"> ${element.quant}</span>
                </div>
            </td>
        </tr>
    `;  
  };
  
  document.getElementById("carrinho-body").innerHTML = carrinhoHTML;

  carrinho.updateCarrinhoTotalValue();

  carrinho.calculaFrete();

  products.forEach((element) => {
    carrinho.setupCounter(element.quant, element.id);
  })

  document.getElementById('btnpagar').addEventListener('click', async (event) => {
    event.preventDefault();
  
    let requestBody = {
      itens_do_carrinho: products,
      endereco: null,
      id_cliente: sessionStorage.getItem('cliente_id')
    };
  
    try {
      let response = await fetch("http://localhost:3000/pedidos", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': sessionStorage.getItem("authorization")
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        alert("Ocorreu um erro ao processar o seu pedido! Entre em contato com a loja!");
        return;  // Exit if response is not okay
      }
  
      let responseBody = await response.text();
      let data = responseBody ? JSON.parse(responseBody) : {};

      carrinho.limparCarrinho();
  
      // Assuming `data` contains an object with a `pedido` property
      sessionStorage.setItem('pedido_id', data.id);
      window.location.href = `EnderecoEntrega.html?id=${data.id}`
  
    } catch (error) {
      console.error("Regra de 3", error);
    }
  });
});
