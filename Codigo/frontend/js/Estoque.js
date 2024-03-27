document.addEventListener('DOMContentLoaded', function () {
    const editarButtons = document.querySelectorAll('.editar');
    const salvarButtons = document.querySelectorAll('.salvar');
    const removerButtons = document.querySelectorAll('.remover');
    const novoProdutoButton = document.querySelector('.button-NovoProduto'); 

  
    function habilitarEdicao(event) {
        const tr = event.target.closest('tr');
        const tdNome = tr.querySelector('td:nth-child(1)');
        const tdCategoria = tr.querySelector('td:nth-child(2)');
        const tdQuantidade = tr.querySelector('td:nth-child(3)');

        // Habilitar edição dos campos
        tdNome.setAttribute('contenteditable', 'true');
        tdCategoria.setAttribute('contenteditable', 'true');
        tdQuantidade.setAttribute('contenteditable', 'true');
    }

  
    function salvarAlteracoes(event) {
        const tr = event.target.closest('tr');
        const tdNome = tr.querySelector('td:nth-child(1)');
        const tdCategoria = tr.querySelector('td:nth-child(2)');
        const tdQuantidade = tr.querySelector('td:nth-child(3)');

        const nome = tdNome.textContent;
        const categoria = tdCategoria.textContent;
        const quantidade = parseInt(tdQuantidade.textContent);

     
        console.log('Nome:', nome);
        console.log('Categoria:', categoria);
        console.log('Quantidade:', quantidade);
    }

   
    function removerProduto(event) {
        const tr = event.target.closest('tr');
        tr.remove();
    }

   
    function adicionarNovoProduto() {
      
        console.log('Botão "Novo Produto" clicado!');
    }

   
    editarButtons.forEach(button => {
        button.addEventListener('click', habilitarEdicao);
    });

   
    salvarButtons.forEach(button => {
        button.addEventListener('click', salvarAlteracoes);
    });

   
    removerButtons.forEach(button => {
        button.addEventListener('click', removerProduto);
    });

   
    novoProdutoButton.addEventListener('click', adicionarNovoProduto);
});
