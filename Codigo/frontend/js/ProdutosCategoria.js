document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaId = urlParams.get('id_categoria');
    const baseUrl = 'http://localhost:3000';

    if (!categoriaId) {
        document.getElementById('product-list').innerHTML = 'Nenhuma categoria selecionada.';
        return;
    }

    fetch(`${baseUrl}/produtos`)
        .then(response => response.json())
        .then(produtos => {
            const filteredProdutos = produtos.filter(produto => produto.id_categoria && produto.id_categoria.id == categoriaId && produto.estoque_atual > 0);

            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            if (filteredProdutos.length === 0) {
                productList.innerHTML = 'Nenhum produto encontrado.';
            } else {
                displayProducts(filteredProdutos, productList);
            }
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
});

function displayProducts(produtos, productList) {
    produtos.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card d-flex justify-content-center align-items-center ';
        productCard.style.width = "250px";

        fetch(`http://localhost:3000/imagens/${product.id_imagem}`)
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
                productCard.innerHTML = `
                    <img src="${imageUrl}" alt="${product.nome}" onerror="this.onerror=null; this.src='../../../img/beer.png';" style="width: 300px; height: 350px; object-fit: contain; margin-top: 2rem;">
                    <div class="d-flex flex-column justify-content-center align-items-center" style="margin-bottom: 2rem;">
                        <h4>${product.nome}</h4>
                        <p class="product-price">R$ ${product.valor ? parseFloat(product.valor).toFixed(2) : 'N/A'}</p>
                        <button class="botao-comprar" onClick="redirectToDetailsPage(${product.id})">
                            Comprar
                        </button>
                    </div>
                `;
                productList.appendChild(productCard);
            })
            .catch(error => {
                console.error("Erro ao buscar a imagem:", error);
            });
    });
}

function redirectToDetailsPage(productId) {
    window.location.href = `DetalhesProduto.html?id=${productId}`;
}