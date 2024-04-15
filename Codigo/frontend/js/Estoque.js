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

       fetch(`${baseUrl}/produtos`) 
        .then(response => response.json())
        .then(produtos => {
            const filteredProdutos = produtos.filter(produto => produto.id_categoria.id == selectedCategoria);
            const tbody = document.querySelector('.tabela tbody');
            tbody.innerHTML = ''; 
            filteredProdutos.forEach(produto => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${produto.nome}</td>
                                <td>${produto.descricao}</td>
                                <td>${produto.estoque_atual}</td>  
                                <td><button class="adicionar">➕</button></td>
                                <td><button class="remover">➖</button></td>`;
                tbody.appendChild(tr);
            });
            addEventListenersToButtons();
        })
        .catch(error => console.error('Erro ao puxar produtos do banco', error));
          });

                          
      // botoões

   function addEventListenersToButtons() {
    const adicionarButtons = document.querySelectorAll('.adicionar');
    const removerButtons = document.querySelectorAll('.remover');
    const novoProdutoButton = document.querySelector('.button-NovoProduto');

    adicionarButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const tr = event.target.closest('tr');
            const tdQuantidade = tr.querySelector('td:nth-child(3)');
            let quantidade_produto = parseInt(prompt("Quantos itens queremos adicionar?"));
            if (quantidade_produto) {
                tdQuantidade.textContent = parseInt(tdQuantidade.textContent) + quantidade_produto;
                console.log(`foram adicionados ${quantidade_produto} itens ao ${tr.querySelector('td:nth-child(1)').textContent}.`);
            }
            else{
                 alert('valor inválido digitado. Favor tentar novamente');
            }
        });
    });

    removerButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const tr = event.target.closest('tr');
            const tdQuantidade = tr.querySelector('td:nth-child(3)');
            let quantidade_produto = parseInt(prompt("Quantos itens queremos remover?"));
            if (quantidade_produto) {
                if (parseInt(tdQuantidade.textContent) >= quantidade_produto) {
                    tdQuantidade.textContent = parseInt(tdQuantidade.textContent) - quantidade_produto;
                    console.log(`Foram removidos ${quantidade_produto} itens de ${tr.querySelector('td:nth-child(1)').textContent}.`);
                } else {
                    alert('Quantidade insuficinete para esta operação :(   tente novamente');
                }
            }
            else{
                alert('valor inválido digitado. Favor tentar novamente');
            }
        });
    });
    }
});
