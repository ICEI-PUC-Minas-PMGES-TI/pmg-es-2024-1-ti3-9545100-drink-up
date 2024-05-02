
// document.getElementById('formCadastro').addEventListener('submit', function (event) {
//     event.preventDefault();


//     const nome = document.getElementById('firstname').value;
//     const data_nascimento = document.getElementById('birthdate').value;
//     const cpf = document.getElementById('cpf').value;
//     const email = document.getElementById('email').value;
//     const rua = document.getElementById('rua').value;
//     const numero = document.getElementById('numero').value;
//     const complemento = document.getElementById('complemento').value;
//     const bairro = document.getElementById('bairro').value;
//     const cidade = document.getElementById('cidade').value;
//     const cep = document.getElementById('cep').value;
//     const telefone = document.getElementById('telefone').value;
//     const senha = document.getElementById('senha').value;
//     const confirmar_senha = document.getElementById('confirmasenha').value;

//     fetch('http://localhost:3000/api/usuarios', { // Alterado para a rota correta do backend para cadastro
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             nome: nome,
//             data_nascimento: data_nascimento,
//             cpf: cpf,
//             email: email,
//             rua: rua,
//             numero: numero,
//             complemento: complemento,
//             bairro: bairro,
//             cidade: cidade,
//             cep: cep,
//             telefone: telefone,
//             senha: senha,
//             confirmar_senha: confirmar_senha
//         })
//     })
//     .then(response => response.json())
//     .then(data => { console.log(data) })
//     .catch(error => { console.log(error); });
// });

// document.getElementById('btncadastrar').addEventListener('onclick', function (event){
//     event.preventDefault();


//     const nome = document.getElementById('firstname').value;
//     const data_nascimento = document.getElementById('birthdate').value;
//     const cpf = document.getElementById('cpf').value;
//     const email = document.getElementById('email').value;
//     const rua = document.getElementById('rua').value;
//     const numero = document.getElementById('numero').value;
//     const complemento = document.getElementById('complemento').value;
//     const bairro = document.getElementById('bairro').value;
//     const cidade = document.getElementById('cidade').value;
//     const cep = document.getElementById('cep').value;
//     const telefone = document.getElementById('telefone').value;
//     const senha = document.getElementById('senha').value;
//     const confirmar_senha = document.getElementById('confirmasenha').value;

//     fetch('http://localhost:3000/api/usuarios', { // Alterado para a rota correta do backend para cadastro
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             nome: nome,
//             data_nascimento: data_nascimento,
//             cpf: cpf,
//             email: email,
//             rua: rua,
//             numero: numero,
//             complemento: complemento,
//             bairro: bairro,
//             cidade: cidade,
//             cep: cep,
//             telefone: telefone,
//             senha: senha,
//             confirmar_senha: confirmar_senha
//         })
//     })
//     .then(response => response.json())
//     .then(data => { console.log(data) })
//     .catch(error => { console.log(error); });
// });

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('bntCadastrar').addEventListener('click', function (event) {
        event.preventDefault();

        const nome = document.getElementById('firstname').value;
        const data_nascimento = document.getElementById('birthdate').value;
        const cpf = document.getElementById('cpf').value;
        const email = document.getElementById('email').value;
        const rua = document.getElementById('rua').value;
        const numero = document.getElementById('numero').value;
        const complemento = document.getElementById('complemento').value;
        const bairro = document.getElementById('bairro').value;
        const cidade = document.getElementById('cidade').value;
        const cep = document.getElementById('cep').value;
        const telefone = document.getElementById('telefone').value;
        const senha = document.getElementById('senha').value;
        const confirmar_senha = document.getElementById('confirmasenha').value;

        fetch('http://localhost:3000/api/usuarios', { // Alterado para a rota correta do backend para cadastro
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                data_nascimento: data_nascimento,
                cpf: cpf,
                email: email,
                rua: rua,
                numero: numero,
                complemento: complemento,
                bairro: bairro,
                cidade: cidade,
                cep: cep,
                telefone: telefone,
                senha: senha,
                confirmar_senha: confirmar_senha
            } ) } )

                .then(response => response.json())
                .then(data => { console.log(data)})
                .catch(error => { console.log(error); });
        })
    });