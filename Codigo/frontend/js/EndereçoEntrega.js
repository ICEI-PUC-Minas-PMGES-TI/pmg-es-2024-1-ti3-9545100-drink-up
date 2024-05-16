document.addEventListener('DOMContentLoaded', function () {
    //document.getElementById('selectCategoria').addEventListener('click', function (event) {
        //event.preventDefault();

        function preencherCampos(endereco) {
            document.getElementById('bairro').value = endereco.bairro;
            document.getElementById('cep').value = endereco.cep;
            document.getElementById('rua').value = endereco.rua;
            document.getElementById('complemento').value = endereco.complemento;
            document.getElementById('numero').value = endereco.numero;
            document.getElementById('cidade').value = endereco.cidade;
        }

        const rua = document.getElementById('rua').value;
        const numero = document.getElementById('numero').value;
        const complemento = document.getElementById('complemento').value;
        const bairro = document.getElementById('bairro').value;
        const cidade = document.getElementById('cidade').value;
        const cep = document.getElementById('cep').value;

        function getEndereco() {
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
        }

        // // Verificar se o usuário está logado antes de chamar a função de obter endereço
        if (window.sessionStorage.getItem("user_id") && window.sessionStorage.getItem('authorization')) {
            getEndereco();
        } else {
            console.error('Usuário não está logado.');
        }

        // fetch('http://localhost:3000/api/usuarios', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         rua: rua,
        //         numero: numero,
        //         complemento: complemento,
        //         bairro: bairro,
        //         cidade: cidade,
        //         cep: cep,
        
        //     })
        // })
        // .then(response => {
        //     if (response.ok) {
        //         return response.json();
        //     }
        //     throw new Error('Erro ao cadastrar usuário');
        // })
        // .then(data => {
        //     console.log(data);
        // })
        // .catch(error => {
        //     console.error('Erro ao cadastrar usuário:', error);
        // });
    //});
});
