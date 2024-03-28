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
                        <td>${bebida.imagem}</td>
                        <td><button class="editar">✏️</button></td>
                        <td><button class="remover">🗑️</button></td>
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
});

// Função para editar a linha selecionada
function editarLinha(botaoEditar) {
  var linha = botaoEditar.parentNode.parentNode;
  var campos = linha.getElementsByTagName("td");
  var form = document.getElementById("formBebida");

  //Preencher os campos do formulário com os valores da linha selecionada
  form.nomeBebida.value = campos[0].textContent;
  form.categoria.value = campos[1].textContent;
  form.tamanhoGarrafa.value = campos[2].textContent;
  form.preco.value = campos[3].textContent;

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
// document.getElementById("salvarBebidas").onclick = function () {
//   var form = document.getElementById("formBebida");
//   var idProduto = form.getAttribute("data-id");

//   // Criar um objeto FormData para enviar os dados, incluindo a imagem
//   var formData = new FormData();
//   formData.append("nome", form.nomeBebida.value);
//   formData.append("categoria", form.categoria.value);
//   formData.append("tamGarrafa", form.tamanhoGarrafa.value);
//   formData.append("valor", form.preco.value);
//   formData.append("imagem", form.imagem.files[0]); // Primeiro arquivo do input de imagem

//   // Enviar solicitação de atualização para o backend
//   fetch(`http://localhost:3000/produtos/${idProduto}`, {
//     method: "PUT",
//     body: formData, // Usar FormData em vez de JSON.stringify
//   })
//     .then((response) => {
//       if (response.ok) {
//         // Se a atualização for bem-sucedida, fechar o pop-up de edição
//         document.getElementById("popup").style.display = "none";

//         // Recarregar a tabela para refletir as alterações feitas
//         carregarBebidas();
//       } else {
//         // Se ocorrer um erro na atualização, mostrar mensagem de erro
//         console.error("Erro ao atualizar o produto");
//       }
//     })
//     .catch((error) => {
//       console.error("Erro ao atualizar o produto:", error);
//     });
// };

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

loadCategoriaInputSelect();
