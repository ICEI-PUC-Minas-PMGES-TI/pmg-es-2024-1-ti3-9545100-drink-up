document.addEventListener("DOMContentLoaded", function () {

  function carregarBebidas() {
    fetch("http://localhost:3000/produtos")
      .then((response) => response.json())
      .then((data) => {
        const tabela = document.querySelector(".tabela tbody");
        tabela.innerHTML = "";

        // Loop através das bebidas cadastradas
        data.forEach((bebida) => {
          const tr = document.createElement("tr");
          tr.setAttribute("data-id", bebida.id);
          tr.innerHTML = `
                        <td>${bebida.nome}</td>
                        <td>${bebida.id_categoria.descricao}</td>
                        <td>${bebida.tam_garrafa}</td>
                        <td>R$${bebida.valor}</td>
                        <td><button class="editar" id=${bebida.id}>✏️</button></td>
                        <td><button class="remover" id=${bebida.id}>🗑️</button></td>
                    `;
          tabela.appendChild(tr);
        });

        // Adiciona manipuladores de evento para botões de edição
        var botoesEditar = document.getElementsByClassName("editar");
        for (var i = 0; i < botoesEditar.length; i++) {
          botoesEditar[i].addEventListener("click", function () {
            editarLinha(this);
          });
        }

        // Adiciona manipuladores de evento para botões de exclusão
        var botoesExcluir = document.getElementsByClassName("remover");
        for (var i = 0; i < botoesExcluir.length; i++) {
          botoesExcluir[i].addEventListener("click", function () {
            removerLinha(this);
          });
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar bebidas:", error);
      });
  }

  carregarBebidas();
  loadCategoriaInputSelect();
  saveProduto();
});


// Função para editar a linha selecionada
 function editarLinha(botaoEditar) {

  const idProduto = botaoEditar.id;

  fetch(`http://localhost:3000/produtos/${idProduto}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('id_produto').value = data.id,
      document.getElementById('nomeBebida').value = data.nome;
      document.getElementById('categoria').value = data.id_categoria;
      document.getElementById('tamanhoGarrafa').value = data.tam_garrafa;
      document.getElementById('preco').value = data.valor;
      document.getElementById('descricao').value = data.descricao;
    })
    .catch((error) => {
      console.error("Erro ao excluir o produto:", error);
    });
    
  //Preencher os campos do formulário com os valores da linha selecionada
  document.getElementById("popup").style.display = "block";
}

// Função para remover a linha selecionada
function removerLinha(botaoRemover) {
  var linha = botaoRemover.parentNode.parentNode;
  var idProduto = linha.getAttribute("data-id");

  // Enviar solicitação de exclusão para o backend
  fetch(`http://localhost:3000/produtos/${idProduto}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        linha.parentNode.removeChild(linha);
      } else {
        console.error("Erro ao excluir o produto");
      }
    })
    .catch((error) => {
      console.error("Erro ao excluir o produto:", error);
    });
}

// Função para fechar o popup de edição
document.getElementById("fecharPopup").onclick = function () {
  document.getElementById("popup").style.display = "none";
};

// Função para salvar as alterações no produto
function saveProduto() {

  document.getElementById("salvarBebida").addEventListener('click', (event) => {

    event.preventDefault();

    const formData = {
       "id": document.getElementById('id_produto').value,
       "nome": document.getElementById('nomeBebida').value,
       "descricao": document.getElementById('descricao').value,
       "valor": document.getElementById('preco').value,
       "tam_garrafa": document.getElementById('tamanhoGarrafa').value,
       "id_imagem": document.getElementById('imagem').value,
       "id_categoria": document.getElementById('categoria').value,
     }

     fetch('http://localhost:3000/produtos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then((response) => {
      if (response.ok) {
        document.getElementById('popup').style.display = 'none';
        window.location.reload();
      }
    })
    .catch((error) => {
      console.error('Erro ao atualizar o produto:', error);
    });
  });
}

function loadCategoriaInputSelect() {
  const inputSelect = document.getElementById("categoria");

  fetch("http://localhost:3000/categorias", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
     for(categoria of data) {
      inputSelect.innerHTML += `
              <option value="${categoria.id}">${categoria.descricao}</option>
          `;
     }
    })
    .catch((error) => {
      console.error("Erro ao listar categorias:", error);
    });
}


