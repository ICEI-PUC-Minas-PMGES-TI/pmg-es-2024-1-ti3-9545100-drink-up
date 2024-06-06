
function preencherCampos(cliente, endereco, email) {
    document.getElementById('cliente-id').value = cliente.id;
    document.getElementById('nome').value = cliente.nome;
    document.getElementById('cpf').value = cliente.cpf;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cep').value = endereco.cep;
    document.getElementById('datanasc').value = cliente.data_nascimento;
    document.getElementById('email').value = email;
    document.getElementById('rua').value = endereco.rua;
    document.getElementById('complemento').value = endereco.complemento;
    document.getElementById('telefone').value = cliente.telefone;
}


// Função para obter os dados do cliente através de uma requisição GET
function getCliente() {
    fetch(`http://localhost:3000/clientes/usuario/${sessionStorage.getItem("user_id")}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': sessionStorage.getItem('authorization')
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Erro ao obter usuário');
    })
    .then(data => {
        preencherCampos(data.cliente, data.endereco, data.email);
        sessionStorage.setItem('cliente_id',data.cliente.id);
        console.log(data.cliente.id);
    })
    .catch(error => {
        console.error('Erro ao obter usuário:', error);
    });
}



// Função para enviar uma requisição PUT com os dados modificados pelo usuário
function save() {
    const clienteId = document.getElementById('cliente-id').value;

    const cliente = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        dataNascimento: document.getElementById('datanasc').value,
        telefone: document.getElementById('telefone').value
    };

    const endereco = {
        rua: document.getElementById('rua').value,
        complemento: document.getElementById('complemento').value,
        bairro: document.getElementById('bairro').value,
        cep: document.getElementById('cep').value
    };

    console.log('Enviando requisição PUT para cliente ID:', clienteId);

    fetch(`http://localhost:3000/clientes/${clienteId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': sessionStorage.getItem('authorization')
        },
        body: JSON.stringify({ cliente, endereco })
    })
    .then(response => {
        console.log('Resposta da requisição PUT:', response);
        if (response.ok) {
            alert('Usuário alterado com sucesso');
            window.location.href = 'Home.html'
        } else {
            throw new Error('Erro ao alterar usuário');
        }
    })
    .catch(error => {
        console.error('Erro ao alterar usuário:', error);
        alert('Erro ao alterar usuário: ' + error.message);
    });
}

// Função que será chamada quando a página carregar para obter e preencher os dados do cliente
window.onload = function() {
    getCliente();
};

// Adicionando evento de clique ao botão salvar
document.getElementById('btnsalvar').addEventListener('click', save);
