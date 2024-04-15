document.addEventListener('DOMContentLoaded', function () {
     const baseUrl = 'http://localhost:3000';


     fetch(`${baseUrl}/categorias`)
        .then(response => response.json())
        .then(categorias => {
            const categoriaSelect = document.getElementById('categoriaSelect');
            categorias.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id; 
                option.textContent = categoria.descricao; 
                categoriaSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar categorias:', error));



    document.querySelector('.button-busca').addEventListener('click', function() {
        const selectedCategoria = document.getElementById('categoriaSelect').value;
        if (!selectedCategoria) {
            alert('selecione a categoria que deseja filtrar!');
            return;
        }

        fetch(`${baseUrl}/estoque`)
        .then(response => response.json())
        .then(estoque => {
            const filteredEstoque = estoque.filter(produto => produto.id_categoria == selectedCategoria);
            const tbody = document.querySelector('.tabela tbody');
            tbody.innerHTML = '';
            filteredEstoque.forEach(produto => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${produto.nome}</td>
                                <td>${produto.descricao}</td>
                                <td>${produto.quantidade}</td>
                                <td><button class="adicionar">➕</button></td>
                                <td><button class="remover">➖</button></td>`;
                tbody.appendChild(tr);});
            addEventListenersToButtons(); })
        .catch(error => console.error('Erro ao puxar estoque do banco', error));
                });

    function addEventListenersToButtons() {
        const addButtons = document.querySelectorAll('.adicionar');
        const removeButtons = document.querySelectorAll('.remover');

        addButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                const tr = event.target.closest('tr');
                const quantidadeTd = tr.querySelector('td:nth-child(3)');
                let quantidadeAtual = parseInt(quantidadeTd.textContent);
                quantidadeAtual = quantidadeAtual + 1; 
                quantidadeTd.textContent = quantidadeAtual;
            });
        });


        

        removeButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                const tr = event.target.closest('tr');
                const quantidadeTd = tr.querySelector('td:nth-child(3)');
                let quantidadeAtual = parseInt(quantidadeTd.textContent);
                if (quantidadeAtual > 0) {
                    quantidadeAtual = quantidadeAtual - 1; 
                    quantidadeTd.textContent = quantidadeAtual;
                } else {
                    alert('operação inválida. Tente novamente!');
                }
            });
        });
    }
});

