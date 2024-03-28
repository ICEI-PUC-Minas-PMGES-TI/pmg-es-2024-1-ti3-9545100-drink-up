document.addEventListener("DOMContentLoaded", function () {
    // Definição dos formulários
    const formularios = {
        "MINHA CONTA": `
            <h3>MINHA CONTA</h3>
            <div class="form-container">
                <div class="form-section">
                    <h3>Alterar Meus Dados</h3>
                    <div class="form-group">
                        <label for="cpf">CPF</label>
                        <input type="text" id="cpf" />
                    </div>
                    <div class="form-group">
                        <label for="full-name">Nome Completo</label>
                        <input type="text" id="full-name" />
                    </div>
                    <div class="form-group">
                        <label for="birthdate">Data de Nascimento</label>
                        <input type="date" id="birthdate" />
                    </div>
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" />
                    </div>

                    <div>
                        <button class="cancel-btn" onclick="cancel()">
                            CANCELAR
                        </button>
                        <button class="save-btn" onclick="save()">SALVAR</button>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Alterar Minha Senha</h3>
                    <div class="form-group">
                        <label for="current-password">Senha Atual</label>
                        <input type="password" id="current-password" />
                    </div>
                    <div class="form-group">
                        <label for="new-password">Senha Nova</label>
                        <input type="password" id="new-password" />
                    </div>
                    <div class="form-group">
                        <label for="confirm-password">Confirme a senha nova</label>
                        <input type="password" id="confirm-password" />
                    </div>
                </div>
            </div>
        `,
        "MEUS PEDIDOS": `
        <h3>MEUS PEDIDOS</h3>
        <table class="pedidos-table">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Detalhes</th>
                </tr>
            </thead>
            <tbody>
                <!-- Exemplo de linha da tabela, você deve preencher isso dinamicamente com seus dados -->
                <tr>
                    <td>01/01/2024</td>
                    <td>R$ 100,00</td>
                    <td>Entregue</td>
                    <td><button class="btn-visualizar" onclick="visualizarDetalhes(this)">Visualizar</button></td>
                </tr>
            </tbody>
        </table>

        <!-- Placeholder para o popup de detalhes -->
        <div id="detalhesPedidoPopup" class="popup" style="display: none;">
            <div class="popup-content">
                <span class="close-popup" onclick="fecharPopup()">&times;</span>
                <h4>Detalhes do Pedido</h4>
                <!-- Conteúdo dos detalhes será inserido aqui -->
            </div>
        </div>
        `,
        "MEU ENDEREÇO": `
        <h3>MEU ENDEREÇO</h3>
        <form class="endereco-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="cep">CEP</label>
                    <input type="text" id="cep" />
                </div>
                <div class="form-group">
                    <label for="logradouro">Logradouro</label>
                    <input type="text" id="logradouro" />
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="bairro">Bairro</label>
                    <input type="text" id="bairro" />
                </div>
                <div class="form-group">
                    <label for="complemento">Complemento</label>
                    <input type="text" id="complemento" />
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="numero">Número</label>
                    <input type="text" id="numero" />
                </div>
                <div class="form-group">
                    <label for="cidade">Cidade</label>
                    <input type="text" id="cidade" />
                </div>
            </div>

            <div>
                <button class="cancel-btn" onclick="cancel()">
                    CANCELAR
                </button>
                <button class="save-btn" onclick="save()">SALVAR</button>
            </div>
            
        </form>
    `,
    };

    function alterarConteudo(novoConteudo) {
        const mainContent = document.querySelector(".content");
        mainContent.innerHTML = novoConteudo;
    }

    const botoes = document.querySelectorAll(".sidebar button");
    botoes.forEach((botao) => {
        botao.addEventListener("click", function () {
            const nomeFormulario = this.textContent;
            const conteudoFormulario = formularios[nomeFormulario];
            alterarConteudo(conteudoFormulario);
        });
    });

    const botaoMinhaConta = document.getElementById("minha-conta");
    botaoMinhaConta.click();
});

function visualizarDetalhes(button) {
    const popup = document.getElementById("detalhesPedidoPopup");
    const popupContent = popup.querySelector(".popup-content");

    popupContent.innerHTML += `
        <table>
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Produto Exemplo</td>
                    <td>1</td>
                    <td>R$ 100,00</td>
                </tr>
            </tbody>
        </table>
    `;

    popup.style.display = "block";
}

function fecharPopup() {
    const popup = document.getElementById("detalhesPedidoPopup");
    popup.style.display = "none";
    popup.querySelector(".popup-content").innerHTML =
        '<span class="close-popup" onclick="fecharPopup()">&times;</span><h4>Detalhes do Pedido</h4>';
}
