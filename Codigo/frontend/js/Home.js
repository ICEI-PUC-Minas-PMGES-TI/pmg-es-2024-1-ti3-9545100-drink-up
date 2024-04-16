
document.addEventListener('DOMContentLoaded', function () {
    const baseUrl = 'http://localhost:3000';

    fetch(`${baseUrl}/produtos`)
        .then(response => response.json())
        .then(produtos => {
            console.log(produtos);
            const productList = document.getElementById('product-list');
            if (productList) {
                displayProducts(produtos, productList);
            } else {
                console.error('Nenhum produto encontrado!');
            }
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
});

function displayProducts(produtos, productList) {
    productList.innerHTML = '';  
    produtos.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
        <img src="${product.url_imagem}" alt="${product.nome}" class="product-image" onerror="this.onerror=null; this.src='../../../img/beer.png';">
            <div class="product-description">
                <h4>${product.nome}</h4>
                <p>${product.descricao}</p>
                <p class="product-price">R$ ${product.valor ? parseFloat(product.valor).toFixed(2) : 'N/A'}</p>
                <button onclick="buyProduct(${product.id})" class="buy-button">Comprar</button>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

function buyProduct(productId) {
    // faltando implementar o carrinho
}
