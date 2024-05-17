document.addEventListener("DOMContentLoaded", function () {
    // Função para carregar os dados de saída de bebidas
    function carregarDadosSaidaBebidas() {
        fetch('http://localhost:3000/produtos/saida-bebidas')
            .then(response => response.json())
            .then(data => {
                const tbody = document.getElementById('saida-table-body');
                tbody.innerHTML = ''; // Limpa o conteúdo anterior

                data.forEach(item => {
                    const row = `
                        <tr>
                            <td>${item.tipo}</td>
                            <td>R$ ${item.valor}</td>
                            <td>${item.nome_bebida}</td>
                        </tr>
                    `;
                    tbody.innerHTML += row;
                });
            })
            .catch(error => console.error('Erro ao carregar dados de saída de bebidas:', error));

        // Recuperando o relatório da sessionStorage
        const relatorioString = sessionStorage.getItem('relatorioSaidaBebidas');
        const relatorioSaidaBebidas = JSON.parse(relatorioString);

        // Exibindo o relatório na tabela de saída de bebidas
        const tbody = document.getElementById('saida-table-body');

        relatorioSaidaBebidas.forEach((item) => {
            const row = `
                <tr>
                    <td>${item.tipo}</td>
                    <td>R$ ${item.valor}</td>
                    <td>${item.nome_bebida}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    }

    carregarDadosSaidaBebidas();
});
