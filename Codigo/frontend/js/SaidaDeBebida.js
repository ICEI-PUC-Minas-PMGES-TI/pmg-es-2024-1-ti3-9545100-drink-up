document.addEventListener("DOMContentLoaded", function () {
    function carregarDadosSaidaBebidas() {
        const token = sessionStorage.getItem("authorization");
        if (!token) {
            alert("Você não está autenticado. Por favor, faça login.");
            window.location.href = "Login.html";
            return;
        }

        fetch(`http://localhost:3000/estoque/relatorio/relatorioMovimentoEstoque`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data);
            const tbody = document.getElementById('saida-table-body');
            if (!tbody) {
                console.error('Table body element not found');
                return;
            }
            tbody.innerHTML = '';

            data.forEach(item => {
                const operacaoClass = item.Movimentacao === 'saida' ? 'operacao-saida' : (item.Movimentacao === 'entrada' ? 'operacao-entrada' : '');

                
                const row = `
                    <tr>
                        <td>${item.Tipo}</td>
                        <td>${item.Qnt}</td>
                        <td>R$ ${item.Valor}</td>
                        <td>${item.NomedaBebida}</td>
                        <td>${item.DescricaoSaida}</td>
                        <td class="${operacaoClass}">${item.Movimentacao}</td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        })
        .catch(error => console.error('Erro ao carregar dados de saída de bebidas:', error));
    }
    carregarDadosSaidaBebidas();
});
