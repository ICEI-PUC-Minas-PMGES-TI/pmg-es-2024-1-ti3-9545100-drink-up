document.addEventListener('DOMContentLoaded', function () {
    const baseUrl = 'http://localhost:3000'; 

    fetch(`${baseUrl}/categorias`)
        .then(response => response.json())
        .then(categorias => {
            const categoryList = document.getElementById('categoryList');
            categorias.forEach(categoria => {
                const listItem = document.createElement('li');
                listItem.textContent = categoria.descricao;
                listItem.dataset.id = categoria.id;
                listItem.classList.add('category-item'); 
                categoryList.appendChild(listItem);
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
            const selectedCategoria = document.querySelector('.category-item.selected');
            const categoriaId = selectedCategoria ? selectedCategoria.dataset.id : null;
            carregarProdutos(categoriaId);
        });
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchQuery = searchInput.value.trim();
            if (searchQuery === "") {
                carregarProdutos();
            } else {
                carregarProdutos(null, searchQuery);
            }
        });
    }

    const btnLogin = document.getElementById('loginBtn');
    if (btnLogin) {
        btnLogin.addEventListener('click', function() {
            window.location.href = 'Login.html';
        });
    }

    const btnPerfil = document.getElementById('perfilBtn');
    const idCliente = sessionStorage.getItem('cliente_id');
    const idUser = sessionStorage.getItem('user_id');
    
    if (btnPerfil) {
        btnPerfil.style.display = 'none'; 

        if (idUser) {
            btnPerfil.style.display = 'block';
            if (idCliente) {
                btnPerfil.addEventListener('click', function() {
                    window.location.href = 'Perfil.html';
                });
            } else {
                btnPerfil.addEventListener('click', function() {
                    window.location.href = 'PerfilAdmin.html';
                });
            }
        }
    }

    // Event listener for category list items
    document.getElementById('categoryList').addEventListener('click', function(event) {
        if (event.target && event.target.nodeName === 'LI') {
            const selectedCategory = document.querySelector('.category-item.selected');
            if (selectedCategory) {
                selectedCategory.classList.remove('selected');
            }
            event.target.classList.add('selected');
            const categoriaId = event.target.dataset.id;
            carregarProdutos(categoriaId);

            // Close the sidebar when a category is clicked
            const sidebar = document.getElementById('sidebar-wrapper');
            const content = document.getElementById('page-content-wrapper');
            sidebar.classList.remove('open');
            content.classList.remove('shifted');
        }
    });

});

function carregarProdutos(filtroCategoria = null, searchQuery = null) {
    const baseUrl = 'http://localhost:3000'; 

    fetch(`${baseUrl}/produtos`)
        .then(response => response.json())
        .then(produtos => {
            let filteredProdutos = produtos;

            if (filtroCategoria) {
                filteredProdutos = filteredProdutos.filter(produto => produto.id_categoria && produto.id_categoria.id == filtroCategoria);
            }

            if (searchQuery) {
                const lowerSearchQuery = searchQuery.toLowerCase();
                filteredProdutos = filteredProdutos.filter(produto => 
                    produto.nome.toLowerCase().includes(lowerSearchQuery) || 
                    produto.descricao.toLowerCase().includes(lowerSearchQuery)
                );
            }

            filteredProdutos = filteredProdutos.filter(produto => produto.estoque_atual > 0);

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
        const categorySection = document.createElement('section');
        categorySection.className = 'category-section w-100';

        const categoryTitle = document.createElement('div');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category;

        categorySection.appendChild(categoryTitle);

        const productRow = document.createElement('div');
        productRow.className = 'product-row w-100';

        // Mostrar apenas os 5 primeiros produtos
        const productsToShow = products.slice(0, 5);

        productsToShow.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card d-flex justify-content-center align-items-center';
            productCard.style.width  = "250px";
            productCard.style.height  = "380px";

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
                    <img src="${imageUrl}" alt="${product.nome}" onerror="this.onerror=null; this.src='../../../img/beer.png';"  style="width: 300px; height: 350px; object-fit: contain; margin-top: 2rem;" >
                    <div class="d-flex flex-column justify-content-center align-items-center" style="margin-bottom: 2rem;">
                        <h4>${product.nome}</h4>
                        <p class="product-price">R$ ${product.valor ? parseFloat(product.valor).toFixed(2) : 'N/A'}</p>
                        <button class="botao-comprar" onClick="redirectToDetailsPage(${product.id})">
                            Comprar
                        </button>
                    </div>
                `;
                productRow.appendChild(productCard);
            })
            .catch(error => {
                console.error("Erro ao buscar a imagem:", error);
            });
        });

        categorySection.appendChild(productRow);

        // Adicionar botão "Ver mais"
        const verMaisButton = document.createElement('button');
        verMaisButton.className = 'verMais';
        verMaisButton.textContent = 'Todos';
        verMaisButton.onclick = function() {
            window.location.href = `ProdutosCategoria.html?id_categoria=${products[0].id_categoria.id}`;
        };
        categorySection.appendChild(verMaisButton);

        productList.appendChild(categorySection);
    }
}

function redirectToDetailsPage(productId) {
    window.location.href = `DetalhesProduto.html?id=${productId}`;
}
