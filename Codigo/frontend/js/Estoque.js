document.addEventListener('DOMContentLoaded', function () {
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
});
