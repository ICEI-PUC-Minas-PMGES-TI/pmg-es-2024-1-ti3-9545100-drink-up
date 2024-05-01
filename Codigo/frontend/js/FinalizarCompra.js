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
        <td><img src="${imageUrl}" alt="Produto" class="product-image"></td>
            <td>${element.nome}</td>
            <td id="item-value">R$ ${element.valor}</td>
            <td>
                <div class="quantity-buttons">
                    <span class="quantity" id="quantity${element.id}">QNT: ${element.quant}</span>
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

});