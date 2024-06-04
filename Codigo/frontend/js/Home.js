const baseUrl = 'http://localhost:3000';

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
            }
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
}

function displayProducts(produtos, productList) {
    produtos.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

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
                <img src="${imageUrl}" alt="${product.nome}" class="product-image" onerror="this.onerror=null; this.src='../../../img/beer.png';">
                <div class="product-description">
                    <h4>${product.nome}</h4>
                    <p>${product.descricao}</p>
                    <p class="product-price">R$ ${product.valor ? parseFloat(product.valor).toFixed(2) : 'N/A'}</p>
                    <button data-id="${product.id}" class="botao-comprar">Comprar</button>
                </div>
            `;
            productList.appendChild(productCard);
            addEventListeners(); 
        })
        .catch(error => {
            console.error("Erro ao buscar a imagem:", error);
            productCard.innerHTML = `
                <img src="../../../img/beer.png" alt="${product.nome}" class="product-image">
                <div class="product-description">
                    <h4>${product.nome}</h4>
                    <p>${product.descricao}</p>
                    <p class="product-price">R$ ${product.valor ? parseFloat(product.valor).toFixed(2) : 'N/A'}</p>
                    <button data-id="${product.id}" class="botao-comprar">Comprar</button>
                </div>
            `;
            productList.appendChild(productCard);
            addEventListeners(); 
        });
    });
}

function addEventListeners() {
    const buttons = document.querySelectorAll('.botao-comprar');
    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            const productId = this.dataset.id; 
            window.location.href = `DetalhesProduto.html?id=${productId}`;
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
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

    const filterBtn = document.getElementById('filterBtn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function () {
            const sidebar = document.getElementById('sidebar-wrapper');
            const content = document.getElementById('page-content-wrapper');
            sidebar.classList.toggle('open');
            content.classList.toggle('shifted');
        });
    }

    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const selectedCategoria = document.getElementById('categorySelect').value;
            carregarProdutos(selectedCategoria);
        });
    }

    const btnLogin = document.getElementById('loginBtn');
    if (btnLogin) {
        btnLogin.addEventListener('click', function() {
            window.location.href = 'Login.html';
        });
    }
});
