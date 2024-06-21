// Função de validação de CPF
function validaCPF(cpf) {
    var Soma = 0;
    var Resto;
    var strCPF = String(cpf).replace(/[^\d]/g, '');

    if (strCPF.length !== 11) return false;

    if ([
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
    ].indexOf(strCPF) !== -1) return false;

    for (var i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (var i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);

    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;

    return true;
}

// Função de validação de senha
function validaSenha(senha) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(senha);
    const hasLowerCase = /[a-z]/.test(senha);
    const hasNumbers = /\d/.test(senha);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

    if (senha.length < minLength) {
        return false;
    }
    if (!hasUpperCase) {
        return false;
    }
    if (!hasLowerCase) {
        return false;
    }
    if (!hasNumbers) {
        return false;
    }
    if (!hasSpecialChar) {
        return false;
    }
    return true;
}

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
    const ageConfirmation = document.getElementById('ageConfirmation').checked;

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
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18) {
        alert('Você deve ter pelo menos 18 anos para se cadastrar.');
        return;
    }

    dataNascimento = new Date(dataNascimento).toISOString().split('T')[0];

    // Validação de CPF usando a função validaCPF
    if (!validaCPF(cpf)) {
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

    if (!validaSenha(senha)) {
        alert('Senha deve ter pelo menos 8 caracteres, conter uma letra maiúscula, um número e um caractere especial.');
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

    if (!ageConfirmation) {
        alert('Você deve confirmar que tem mais de 18 anos.');
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
        window.location.href = 'Login.html';
    })
    .catch(error => {
        console.error(error);
        alert('Erro ao cadastrar cliente. Verifique os dados e tente novamente.');
    });
});

document.getElementById('openPopup').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('popupContainer').style.display = 'block';
});

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popupContainer').style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('popupContainer')) {
        document.getElementById('popupContainer').style.display = 'none';
    }
});
