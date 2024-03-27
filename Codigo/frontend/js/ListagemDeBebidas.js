// Função para editar a linha selecionada
function editarLinha(botaoEditar) {
    var linha = botaoEditar.parentNode.parentNode;
    var campos = linha.getElementsByTagName("td");
    var form = document.getElementById("formBebida");

    // Preencher os campos do formulário com os valores da linha selecionada
    form.nomeBebida.value = campos[0].textContent;
    form.categoria.value = campos[1].textContent;
    form.tamanhoGarrafa.value = campos[2].textContent;
    form.preco.value = campos[3].textContent;

    // Exibir o popup de edição
    document.getElementById("popup").style.display = "block";
}

// Função para remover a linha selecionada
function removerLinha(botaoRemover) {
    var linha = botaoRemover.parentNode.parentNode;
    linha.parentNode.removeChild(linha);
}

// Função para fechar o popup de edição
document.getElementById("fecharPopup").onclick = function() {
    document.getElementById("popup").style.display = "none";
};

// Adiciona manipuladores de evento para botões de edição
var botoesEditar = document.getElementsByClassName("editar");
for (var i = 0; i < botoesEditar.length; i++) {
    botoesEditar[i].addEventListener("click", function() {
        editarLinha(this);
    });
}

// Adiciona manipuladores de evento para botões de exclusão
var botoesExcluir = document.getElementsByClassName("remover");
for (var i = 0; i < botoesExcluir.length; i++) {
    botoesExcluir[i].addEventListener("click", function() {
        removerLinha(this);
    });
}
