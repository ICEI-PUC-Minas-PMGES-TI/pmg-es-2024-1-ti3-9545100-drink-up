function cancel() {
    document.getElementById('current-password').value = "";
    document.getElementById('new-password').value = "";
    document.getElementById('confirm-password').value = "";
}


function save() {
    const senhaAtual = document.getElementById('current-password').value;
    const novaSenha = document.getElementById('new-password').value;
    const confirmarNovaSenha = document.getElementById('confirm-password').value;

    if (!senhaAtual || !novaSenha || !confirmarNovaSenha) {
        throw new Error('Por favor, preencha todos os campos');
    }

    if (novaSenha !== confirmarNovaSenha) {
        throw new Error('A nova senha e a confirmação da senha não coincidem');
    }

    const data = {
        senhaAtual,
        novaSenha
    };

    // Exemplo de como você poderia enviar os dados para o servidor
    fetch(`http://localhost:3000/usuarios/alterarSenha/${sessionStorage.getItem("user_id")}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': sessionStorage.getItem("authorization")
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            alert('Senha alterada com sucesso');
            location.reload()
            return response.json();
        }
        else{
            throw new Error('não foi possível alterar a senha');
        }
        
        
    })
    .catch(error => {
        console.error('Erro ao alterar senha:', error);
        alert('Erro ao alterar senha: ' + error.message);
    });
}
