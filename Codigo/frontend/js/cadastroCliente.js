document.getElementById('bntCadastrar').addEventListener('click', function (event) {
    event.preventDefault();

    const nome = document.getElementById('firstname').value;
    let dataNascimento = document.getElementById('birthdate').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const rua = document.getElementById('rua').value;
    const numero = parseInt(document.getElementById('numero').value, 10);
    const complemento = document.getElementById('complemento').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const cep = document.getElementById('cep').value;
    const uf = document.getElementById('uf').value;
    const telefone = document.getElementById('telefone').value;
    const senha = document.getElementById('senha').value;

    if (!numero) {
        alert('insira um número válido.');
        return;
    }

    if (uf.length !== 2) {
        alert('insira uma UF válida de 2 caracteres.');
        return;
    }

    if (cep.length !== 8) {
        alert('insira um CEP válido de 8 dígitos.');
        return;
    }

    if (isNaN(Date.parse(dataNascimento))) {
        alert('insira uma data de nascimento válida.');
        return;
    } else {
        dataNascimento = new Date(dataNascimento).toISOString().split('T')[0];
    }

    const endereco = { rua, numero, complemento, bairro, cidade, cep, uf };
    const usuario = { email, senha };

    fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, cpf, dataNascimento, telefone, endereco, usuario })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Cadastro realizado com sucesso!');
    })
    .catch(error => {
        console.error(error);
        alert('Erro ao cadastrar cliente. Verifique os dados e tente novamente.');
    });
});
