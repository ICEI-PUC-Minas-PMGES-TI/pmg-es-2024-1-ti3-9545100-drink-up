function getEndereco() {
    const selectedOption = document.getElementById('selectCategoria').value;
    
    // Verifica se a opção selecionada é "Meu Endereço"
    if (selectedOption === 'meu_endereco') {
        fetch(`http://localhost:3000/clientes/usuario/${window.sessionStorage.getItem("user_id")}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': window.sessionStorage.getItem('authorization')
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro ao obter endereço');
        })
        .then(data => {
            console.log(data)
            preencherCampos(data.endereco);
        })
        .catch(error => {
            console.error('Erro ao obter endereço:', error);
        });
    } else {
        // Se a opção selecionada for "Novo Endereço", limpa os campos
        limparCampos();
    }
}

// Adicionando um ouvinte de evento de mudança ao elemento <select>
document.getElementById('selectCategoria').addEventListener('change', getEndereco);

// Verificar se o usuário está logado antes de chamar a função de obter endereço
if (window.sessionStorage.getItem("user_id") && window.sessionStorage.getItem('authorization')) {
    getEndereco();
} else {
    console.error('Usuário não está logado.');
}

//////////////////////////////////////////
function getEndereco() {
    const selectedOption = document.getElementById('selectCategoria').value;
    
    // Verifica se a opção selecionada é "Meu Endereço"
    if (selectedOption === 'meu_endereco') {
        fetch(`http://localhost:3000/clientes/usuario/${pedidoId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': window.sessionStorage.getItem('authorization')
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro ao obter endereço');
        })
        .then(data => {
            console.log(data)
            preencherCampos(data.endereco);
        })
        .catch(error => {
            console.error('Erro ao obter endereço:', error);
        });
    } else {
        // Se a opção selecionada for "Novo Endereço", limpa os campos
        limparCampos();
    }
}