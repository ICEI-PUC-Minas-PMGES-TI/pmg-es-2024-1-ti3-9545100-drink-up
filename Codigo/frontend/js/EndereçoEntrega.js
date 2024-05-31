document.addEventListener('DOMContentLoaded', function () {

    const params = new URLSearchParams(window.location.search);
    const pedidoId = parseInt(params.get('id'), 10);

    function preencherCampos(endereco) {
        document.getElementById('bairro').value = endereco.bairro;
        document.getElementById('cep').value = endereco.cep;
        document.getElementById('rua').value = endereco.rua;
        document.getElementById('complemento').value = endereco.complemento;
        document.getElementById('numero').value = endereco.numero;
    }

    function limparCampos() {
        document.getElementById('bairro').value = '';
        document.getElementById('cep').value = '';
        document.getElementById('rua').value = '';
        document.getElementById('complemento').value = '';
        document.getElementById('numero').value = '';
    }

    async function alterarEnderecoPedido(endereco, id_pedido) {
        try {
            if (!endereco || !id_pedido) {
                throw new Error('Endereço não informado corretamente');
            }

            const response = await fetch(`/pedidos/endereco/${id_pedido}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': window.sessionStorage.getItem('authorization')
                },
                body: JSON.stringify(endereco)
            });

            if (!response.ok) {
                throw new Error('Erro ao alterar endereço do pedido');
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Erro ao alterar endereço:', error);
            throw new Error('Erro ao alterar endereço');
        }
    }

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

    document.getElementById('btnContinuar').addEventListener('click', async (event) => {
        event.preventDefault();
        
        const selectedCategoria = document.getElementById('selectCategoria').value;

        if (selectedCategoria === 'endereco_novo') {

            const endereco = {
               "endereco" : {
                bairro: document.getElementById('bairro').value,
                cep: document.getElementById('cep').value,
                rua: document.getElementById('rua').value,
                complemento: document.getElementById('complemento').value,
                numero: document.getElementById('numero').value,
                uf: document.getElementById('UF').value
               }
            }
    
            try {
                const response = await fetch(`http://localhost:3000/pedidos/endereco/${window.sessionStorage.getItem("pedido_id")}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': window.sessionStorage.getItem('authorization')
                    },
                    body: JSON.stringify(endereco)
                });

                if (!response.ok) {
                    throw new Error('Erro ao alterar endereço do pedido');
                }

                const data = await response.json();
                console.log('Endereço alterado com sucesso:', data);
                alert('Endereço alterado com sucesso!');
            } catch (error) {
                console.error('Erro ao alterar endereço:', error);
                alert('Erro ao alterar endereço. Por favor, tente novamente.');
            }
        } else {
            // Se a opção for "Meu Endereço", não é necessário fazer nada adicional aqui
        }
        
        // Redirecionar para a tela de Pagamento.html
        window.location.href = 'Pagamento.html';
    });

    function obterFrete() {
        fetch(urlFrete)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao obter o frete');
                }
                return response.json();
            })
            .then(data => {
                // Atualiza o conteúdo da div com o ID 'valorFrete' com o valor do frete
                const valorFreteDiv = document.getElementById('valorFrete');
                valorFreteDiv.textContent = `R$ ${data.valor.toFixed(2)}`;
            })
            .catch(error => {
                console.error('Erro ao obter o frete:', error);
            });
    }

    // Chama a função para obter o valor do frete quando a página carregar
    obterFrete();
});
