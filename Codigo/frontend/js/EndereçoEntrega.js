

document.addEventListener('DOMContentLoaded', function() {
    // URL da rota para obter o valor do frete
    const urlFrete = 'http://localhost:3000/fretes';
    
    // Função para obter o valor do frete da API
    function obterFrete() {
        fetch(urlFrete)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao obter o frete');
                }
                return response.json();
            })
            .then(data => {
                // Atualiza o conteúdo da div com o ID 'valorFrete' com o valor do frete
                const valorFreteDiv = document.getElementById('valorFrete');
                valorFreteDiv.textContent = `R$ ${data.valor.toFixed(2)}`;
            })
            .catch(error => {
                console.error('Erro ao obter o frete:', error);
            });
    }

    // Chama a função para obter o valor do frete quando a página carregar
    obterFrete();
});
