document.addEventListener('DOMContentLoaded', function () {
    const baseUrl = 'http://localhost:3000';

    function carregarProdutos() {
        fetch(`${baseUrl}/produtos`)
            .then(response => response.json())
            .then(produtos => {
                let filteredProdutos = produtos.filter(produto => produto.estoque_atual < 10); 
                const tbody = document.querySelector('.tabela tbody');
                tbody.innerHTML = '';
                filteredProdutos.forEach(produto => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td>${produto.nome}</td>
                                    <td>${produto.id_categoria ? produto.id_categoria.descricao : 'Sem categoria'}</td>
                                    <td class="quantidade">${produto.estoque_atual}</td>`;
                    tbody.appendChild(tr);
                });
            })
            .catch(error => console.error('Erro ao puxar produtos do banco', error));
    }

    carregarProdutos();
});
