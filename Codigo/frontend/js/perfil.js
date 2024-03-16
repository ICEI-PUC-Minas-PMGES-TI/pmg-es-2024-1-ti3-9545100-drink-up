document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('btnBuscarUsuario').addEventListener('click', function (event) {
    event.preventDefault();
    const email = document.getElementById('inputEmailBusca').value;
    fetch('http://localhost:3000/api/usuarios/buscar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        })
        .then(response => {
            if (!response.ok) {throw new Error('Falha na busca por usuário');}return response.json();})
        .then(data => {
            if(data && data.user) {preencherFormulario(data.user);} else {
                alert('Usuário não encontrado.');
            }})
        .catch(error => {
            console.error('Erro na busca:', error);
            alert('Erro ao buscar usuário.');
        });
    });
});

function preencherFormulario(usuario) {
    document.getElementById('nome').value = usuario.nome || '';
    document.getElementById('cpf').value = usuario.cpf || '';
    document.getElementById('cidade').value = usuario.cidade || '';
    document.getElementById('bairro').value = usuario.bairro || '';
    document.getElementById('cep').value = usuario.cep || '';
    document.getElementById('email').value = usuario.email || '';
    document.getElementById('rua').value = usuario.rua || '';
    document.getElementById('complemento').value = usuario.complemento || '';
    document.getElementById('telefone').value = usuario.telefone || '';
}
