document.addEventListener('DOMContentLoaded', function () {
    const baseUrl = 'http://localhost:3000';
    const btnLogin = document.getElementById('btnLogin');


    

    function carregarProdutos(filtroCategoria) {
        fetch(`${baseUrl}/produtos`)
        .then(response => response.json())
        .then(produtos => {
            let filteredProdutos;
            if (filtroCategoria) {
                filteredProdutos = produtos.filter(produto => produto.id_categoria && produto.id_categoria.id == filtroCategoria);
            } else {
                filteredProdutos = produtos;
            }
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            if (filteredProdutos.length === 0) {
                productList.innerHTML = 'Nenhum produto encontrado para esta categoria.';
            } else {
                displayProducts(filteredProdutos, productList);
                addEventListeners();  // para ficar aberto pra direcionar pra outra página
            }
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
    }


    

    function displayProducts(produtos, productList) {
        produtos.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.url_imagem}" alt="${product.nome}" class="product-image" onerror="this.onerror=null; this.src='../../../img/beer.png';">
                <div class="product-description">
                    <h4>${product.nome}</h4>
                    <p>${product.descricao}</p>
                    <p class="product-price">R$ ${product.valor ? parseFloat(product.valor).toFixed(2) : 'N/A'}</p>
                    <button data-id="${product.id}" class="botao-comprar">Comprar</button>
                </div>
            `;
            productList.appendChild(productCard);
        });
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
        .catch(error => console.error('Erro para carregar categorias:', error));




    document.querySelector('.button-busca').addEventListener('click', function() {
        const selectedCategoria = document.getElementById('categorySelect').value;
        console.log("Categoria selecionada para filtragem:", selectedCategoria);  
        carregarProdutos(selectedCategoria);
    });



    function addEventListeners() {
        const buttons = document.querySelectorAll('.botao-comprar');
        buttons.forEach(button => {
            button.addEventListener('click', function(event) {
                const productId = this.dataset.id; 
                window.location.href = `DetalhesProduto.html?id=${productId}`;
            });
        });
    }
    btnLogin.addEventListener('click', function() {
        window.location.href= 'Login.html'
    });
});
