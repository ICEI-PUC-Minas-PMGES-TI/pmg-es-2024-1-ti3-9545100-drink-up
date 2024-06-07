import { Carrinho } from "./utils/Carrinho.js";

document.addEventListener("DOMContentLoaded", async function () {
  const carrinho = new Carrinho();

  const products = carrinho.carregarProdutosDoCookie();
  let arrayProducts = [];

  // Segundo loop para carregar dados das imagens
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
  
  let carrinhoHTML ='';
  for (const element of products) {
      carrinhoHTML += `
          <tr>
              <td><img src="${element.image}" alt="Produto" class="product-image"></td>
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
  }
  

  document.getElementById("carrinho-body").innerHTML = carrinhoHTML;

  carrinho.updateCarrinhoTotalValue();

  products.forEach((element) => {
    carrinho.setupCounter(element.quant, element.id);
  })



  
  let elementsRemoveIcons = document.querySelectorAll('[id^="remove-item"]');

  elementsRemoveIcons.forEach((element) => {
    element.addEventListener("click", () => {
      let itemToRemoveId = element.id.replace("remove-item", "");

      carrinho.removerItem(parseInt(itemToRemoveId));

      window.location.reload();
    });
  });

});
