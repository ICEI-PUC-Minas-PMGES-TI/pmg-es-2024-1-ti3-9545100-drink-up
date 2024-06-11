document.addEventListener('DOMContentLoaded', function () {
    const baseUrl = 'http://localhost:3000'; 

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

    // Lógica para carregar produtos com filtro de busca
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchInput = document.getElementById('searchInput').value;
            carregarProdutos(null, searchInput);
        });
    }

    // Lógica para o botão de login
    const btnLogin = document.getElementById('loginBtn');
    if (btnLogin) {
        btnLogin.addEventListener('click', function() {
            window.location.href = 'Login.html';
        });
    }
});

// Função para carregar produtos
function carregarProdutos(filtroCategoria = null, searchQuery = null) {
    const baseUrl = 'http://localhost:3000'; 

    fetch(`${baseUrl}/produtos`)
        .then(response => response.json())
        .then(produtos => {
            let filteredProdutos = produtos;

            // Filtro por categoria
            if (filtroCategoria) {
                filteredProdutos = filteredProdutos.filter(produto => produto.id_categoria && produto.id_categoria.id == filtroCategoria);
            }

            // Filtro por busca
            if (searchQuery) {
                const lowerSearchQuery = searchQuery.toLowerCase();
                filteredProdutos = filteredProdutos.filter(produto => 
                    produto.nome.toLowerCase().includes(lowerSearchQuery) || 
                    produto.descricao.toLowerCase().includes(lowerSearchQuery)
                );
            }

            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            if (filteredProdutos.length === 0) {
                productList.innerHTML = 'Nenhum produto encontrado.';
            } else {
                displayProductsByCategory(filteredProdutos, productList);
            }
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
}

function displayProductsByCategory(produtos, productList) {
    const categories = {};

    produtos.forEach(product => {
        if (!categories[product.id_categoria.descricao]) {
            categories[product.id_categoria.descricao] = [];
        }
        categories[product.id_categoria.descricao].push(product);
    });

    for (const [category, products] of Object.entries(categories)) {
        const categorySection = document.createElement('div');
        categorySection.className = 'category-section';

        const categoryTitle = document.createElement('h3');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category;

        categorySection.appendChild(categoryTitle);

        const productRow = document.createElement('div');
        productRow.className = 'product-row';

        products.forEach(product => {
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
                productRow.appendChild(productCard);
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
                productRow.appendChild(productCard);
                addEventListeners();
            });
        });

        categorySection.appendChild(productRow);
        productList.appendChild(categorySection);
    }
}

// Função para adicionar listeners aos botões de comprar
function addEventListeners() {
    const buttons = document.querySelectorAll('.botao-comprar');
    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            const productId = this.dataset.id; 
            window.location.href = `DetalhesProduto.html?id=${productId}`;
        });
    });
}
