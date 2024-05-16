import { Carrinho } from "./utils/Carrinho.js";

document.addEventListener("DOMContentLoaded", function () {
  const carrinho = new Carrinho();

  const products = carrinho.carregarProdutosDoCookie();

  let carrinhoHTML = '';
  products.forEach((element) => {
    //const imageUrl = element.imagem || '../../../img/beer.png'; // verifica se o element de imagem é nulo. Atualmente não funciona pois os testes de banco está passando valores fictícios. Deverá ser adaptado.
    const imageUrl = '../../../img/beer.png';
    carrinhoHTML += `
        <tr>
        <td class="espaco-imagem"><img src="${imageUrl}" alt="Produto" class="product-image"></td>
            <td>${element.nome}</td>
            <td id="item-value">R$ ${element.valor}</td>
            <td>
                <div class="quantity-buttons">
                    <span class="quantity" id="quantity${element.id}"> ${element.quant}</span>
                </div>
            </td>
        </tr>
    `;

  });

  document.getElementById("carrinho-body").innerHTML = carrinhoHTML;

  carrinho.updateCarrinhoTotalValue();

  products.forEach((element) => {
    carrinho.setupCounter(element.quant, element.id);
  })

  document.getElementById('btnpagar').addEventListener('click', (event) => {
    event.preventDefault();

    let requestBody = {
      itens_do_carrinho: products,
      endereco: null,
      id_cliente: 1
    };

    fetch("http://localhost:3000/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
    .then((response) => {

      if (!response.ok) {
         alert("Ocorreu um erro ao processar o seu pedido! Entre em contato com a loja!");
      }

      carrinho.limparCarrinho();
      alert("Pedido Registrado com sucesso! Realize o pagamento do seu pedido e anexe o comprovante via WhatsApp!");
      window.location.href = "./EnderecoEntrega.html";
    })
    .catch((error) => {
      console.error("FUDEU", error);
    });
  });

});