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

    if (!nome.trim()) {
        alert('Nome é obrigatório!');
        return;
    }

    if (!numero) {
        alert('Insira um número válido.');
        return;
    }

    if (uf.length !== 2) {
        alert('Insira uma UF válida de 2 caracteres.');
        return;
    }

    if (cep.length !== 8) {
        alert('Insira um CEP válido de 8 dígitos.');
        return;
    }

    if (isNaN(Date.parse(dataNascimento)) || new Date(dataNascimento) > new Date()) {
        alert('Insira uma data de nascimento válida e que não seja futura.');
        return;
    }

    // Verificar se a data de nascimento indica idade maior que 18 anos
    const today = new Date();
    const birthDate = new Date(dataNascimento);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18) {
        alert('Você deve ter pelo menos 18 anos para se cadastrar.');
        return;
    }

    dataNascimento = new Date(dataNascimento).toISOString().split('T')[0];

    if (cpf.length !== 11 || !cpf.split('').every(c => !isNaN(parseInt(c)))) {
        alert('Valor de CPF inválido!');
        return;
    }

    if (cep.length !== 8 || !cep.split('').every(c => !isNaN(parseInt(c)))) {
        alert('Valor de CEP inválido!');
        return;
    }

    if (!telefone.trim() || isNaN(parseInt(telefone)) || telefone.trim().length > 11) {
        alert('Telefone inválido!');
        return;
    }

    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        alert('E-mail inválido!');
        return;
    }

    if (senha.length < 8) {
        alert('Senha deve ter pelo menos 8 caracteres.');
        return;
    }

    if (!cidade.trim()) {
        alert('Cidade é obrigatório.');
        return;
    }

    if (!rua.trim()) {
        alert('Rua é obrigatório.');
        return;
    }

    if (!bairro.trim()) {
        alert('Bairro é obrigatório.');
        return;
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
        
        // Armazenar os dados do usuário no localStorage
        localStorage.setItem('usuarioLogado', JSON.stringify(data));
        
        // Redirecionar para a tela de home
        window.location.href = 'Home.html';
    })
    .catch(error => {
        console.error(error);
        alert('Erro ao cadastrar cliente. Verifique os dados e tente novamente.');
    });
});
