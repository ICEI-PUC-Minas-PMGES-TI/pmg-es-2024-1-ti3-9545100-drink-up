document.addEventListener('DOMContentLoaded', function () {
    const baseUrl = 'http://localhost:3000';



    

    function carregarProdutos(filtroCategoria) {
        fetch(`${baseUrl}/produtos`)
        .then(response => response.json())
        .then(produtos => {
            let filteredProdutos = filtroCategoria ? produtos.filter(produto => produto.categoria_id == filtroCategoria) : produtos;
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            filteredProdutos.forEach(product => {
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
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
    }



    fetch(`${baseUrl}/categorias`)
        .then(response => response.json())
        .then(categorias => {
            const categorySelect = document.getElementById('categorySelect');
            categorias.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id;
                option.textContent = categoria.descricao;
                categorySelect.appendChild(option);
            });
            carregarProdutos();
        })
        .catch(error => console.error('Erro ao carregar categorias:', error));




    document.querySelector('.button-busca').addEventListener('click', function() {
        const selectedCategoria = document.getElementById('categorySelect').value;
        carregarProdutos(selectedCategoria);
    });





    function buyProduct(productId) {
        console.log('Produto comprado:', productId);
        ////////////
    }
});
