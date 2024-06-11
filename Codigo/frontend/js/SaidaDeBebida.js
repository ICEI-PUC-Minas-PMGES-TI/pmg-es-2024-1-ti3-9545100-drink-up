document.addEventListener("DOMContentLoaded", function () {
    function carregarDadosSaidaBebidas() {
        const token = sessionStorage.getItem("authorization");
        if (!token) {
            alert("Você não está autenticado. Por favor, faça login.");
            window.location.href = "Login.html";
            return;
        }

        fetch(`http://localhost:3000/estoque/relatorio/SaidaBebidas`, {
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
            tbody.innerHTML = ''; // Clear previous content

            data.forEach(item => {
                const row = `
                    <tr>
                        <td>${item.Tipo}</td>
                        <td>${item.Qnt}</td>
                        <td>R$ ${item.Valor}</td>
                        <td>${item.NomedaBebida}</td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        })
        .catch(error => console.error('Erro ao carregar dados de saída de bebidas:', error));

        // Debug session storage data
        const relatorioString = sessionStorage.getItem('relatorioSaidaBebidas');
        console.log('Session storage data:', relatorioString);
        if (!relatorioString) {
            console.error('relatorioSaidaBebidas is not set in sessionStorage');
            return;
        }

        const relatorioSaidaBebidas = JSON.parse(relatorioString);
        console.log('Parsed session storage data:', relatorioSaidaBebidas);

        if (!Array.isArray(relatorioSaidaBebidas)) {
            console.error('Parsed session storage data is not an array');
            return;
        }

        const tbody = document.getElementById('saida-table-body');
        if (!tbody) {
            console.error('Table body element not found');
            return;
        }

        relatorioSaidaBebidas.forEach((item) => {
            const row = `
                <tr>
                    <td>${item.tipo}</td>
                    <td>R$ ${item.valor_item}</td>
                    <td>${item.nome_bebida}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    }

    carregarDadosSaidaBebidas();
});
