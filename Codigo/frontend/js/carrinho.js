import { Carrinho } from "./utils/Carrinho.js";

document.addEventListener("DOMContentLoaded", function () {
  const carrinho = new Carrinho();

  const products = carrinho.carregarProdutosDoCookie();

  let carrinhoHTML = '';
  products.forEach((element) => {
    carrinhoHTML += `
        <tr>
            <td><img src="" alt="Produto" class="product-image"></td>
            <td>${element.nome}</td>
            <td id="item-value">R$ ${element.valor}</td>
            <td>
                <div class="quantity-buttons">
                    <button id="decrease-button${element.id}"><i class="fa-solid fa-minus"></i></button>
                    <span class="quantity" id="quantity${element.id}">${element.quant}</span>
                    <button id="increase-button${element.id}"><i class="fa-solid fa-plus"></i></button>
                </div>
            </td>
            <td>
                <button class="remove-button" id="remove-item${element.id}"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
    `;

  });

  document.getElementById("carrinho-body").innerHTML = carrinhoHTML;

  carrinho.updateCarrinhoTotalValue();

  products.forEach((element) => {
    carrinho.setupCounter(element.quant, element.id);
  })

  /**
   * Removendo Item do carrinho
   */

  let elementsRemoveIcons = document.querySelectorAll('[id^="remove-item"]');

  elementsRemoveIcons.forEach((element) => {
    element.addEventListener("click", () => {
      let itemToRemoveId = element.id.replace("remove-item", "");

      carrinho.removerItem(parseInt(itemToRemoveId));

      window.location.reload();
    });
  });

});
