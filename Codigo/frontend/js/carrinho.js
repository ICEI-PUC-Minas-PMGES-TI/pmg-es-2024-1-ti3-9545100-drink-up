import { Carrinho } from "./utils/Carrinho.js";

document.addEventListener("DOMContentLoaded", function () {
    const baseUrl = 'http://localhost:3000';
    const carrinho = new Carrinho();
    const products = carrinho.carregarProdutosDoCookie();
    let carrinhoHTML = '';

    const productList = document.getElementById("carrinho-body");
    productList.innerHTML = ''; // Limpar lista de produtos inicialmente

    products.forEach((element) => {
        fetch(`${baseUrl}/imagens/${element.id_imagem}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar a imagem: ' + response.statusText);
                }
                return response.json();
            })
            .then(imageData => {
                if (!imageData || !imageData.caminho) {
                    throw new Error('A URL da imagem não está disponível.');
                }
                const imageUrl = imageData.caminho;
                carrinhoHTML += `
                    <tr>
                        <td><img src="${imageUrl}" alt="${element.nome}" class="product-image" onerror="this.onerror=null; this.src='../../../img/beer.png';"></td>
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
                productList.innerHTML = carrinhoHTML;
                addEventListeners(); // Adicionar os listeners após atualizar o HTML
            })
            .catch(error => {
                console.error("Erro ao buscar a imagem:", error);
                carrinhoHTML += `
                    <tr>
                        <td><img src="../../../img/beer.png" alt="${element.nome}" class="product-image"></td>
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
                productList.innerHTML = carrinhoHTML;
                addEventListeners(); // Adicionar os listeners após atualizar o HTML
            });
    });

    carrinho.updateCarrinhoTotalValue();

    products.forEach((element) => {
        carrinho.setupCounter(element.quant, element.id);
    });

    function addEventListeners() {
        let elementsRemoveIcons = document.querySelectorAll('[id^="remove-item"]');
        elementsRemoveIcons.forEach((element) => {
            element.addEventListener("click", () => {
                let itemToRemoveId = element.id.replace("remove-item", "");
                carrinho.removerItem(parseInt(itemToRemoveId));
                window.location.reload();
            });
        });
    }
});