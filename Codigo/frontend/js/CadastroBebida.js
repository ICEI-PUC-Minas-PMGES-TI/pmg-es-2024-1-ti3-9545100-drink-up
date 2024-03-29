document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("btncadastrar")
    .addEventListener("click", function (event) {
      event.preventDefault();

      const nome = document.getElementById("nome").value;
      const categoria = document.getElementById("selectCategoria").value;
      const descricao = document.getElementById("descricao").value;
      const tamGarrafa = document.getElementById("tamGarrafa").value;
      const valor = document.getElementById("valor").value;
      const imagem = document.getElementById("imagem").value;
      // const estoque_atual = document.getElementById("estoque_atual").value;

      fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "nome": nome,
          "id_categoria": categoria,
          "descricao": descricao,
          "tam_garrafa": tamGarrafa,
          "valor": valor,
          //"estoque_atual": estoque_atual,
          "id_imagem": imagem,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          window.location.href = "ListagemDeBebidas.html";
        })
        .catch((error) => {
          console.error("Erro ao cadastrar bebida:", error);
        });
    });

  // Pega o modal de categoria
  var modal = document.getElementById("modalCategoria");

  // Pega o select da categoria
  var selectCategoria = document.getElementById("selectCategoria");

  // Pega o botão de fechar o modal
  var span = document.querySelector(".close");

  // Evento change para o select da categoria
  selectCategoria.addEventListener("change", function () {
    if (selectCategoria.value === "adicionar") {
      // Abre o modal para adicionar uma nova categoria
      modal.style.display = "block";
    }
  });

  // Evento de clique para fechar o modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // Evento para fechar o modal clicando fora dele
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  //////////////////// pop up

  // Evento de clique para o botão de adicionar nova categoria
  var btnNovo = document.getElementById("btnNovo");
  btnNovo.addEventListener("click", function () {
    var container = document.getElementById("novoCampoCategoria");

    // Limpa o contêiner para evitar múltiplos campos
    container.innerHTML = "";

    // Cria o campo de input
    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Nome da nova categoria";
    input.classList.add("form-control");

    // Cria o botão de salvar
    var btnSave = document.createElement("button");
    btnSave.innerText = "Salvar";
    btnSave.classList.add("btn", "btn-primary");

    // Evento de clique para o botão Salvar
    btnSave.addEventListener("click", function () {
      var nomeCategoria = input.value;
      fetch("http://localhost:3000/categorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ descricao: nomeCategoria }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const novaOpcao = document.createElement("option");
          novaOpcao.value = data.id;
          novaOpcao.innerText = data.descricao;
          selectCategoria.appendChild(novaOpcao);
          modal.style.display = "none";

          loadCategoriaTable();
        })
        .catch((error) => {
          console.error("Erro ao adicionar categoria:", error);
        });
    });

    container.appendChild(input);
    container.appendChild(btnSave);
  });

  function loadCategoriaInputSelect() {
    const inputSelect = document.getElementById("selectCategoria");

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

  // Função para carregar a tabela de categorias
  function loadCategoriaTable() {
    fetch("http://localhost:3000/categorias", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const tableBody = document.getElementById("tabela-body");
        tableBody.innerHTML = "";
        data.forEach((categoria) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                    <td>#${categoria.id}</td>
                    <td>${categoria.descricao}</td>
                    <td><button class="editar" data-id="${categoria.id}">✏️</button></td>
                    <td><button class="remover" data-id="${categoria.id}">🗑️</button></td>
                `;
          row.querySelector(".editar").addEventListener("click", function () {
            editarCategoria(categoria.id);
          });
          row.querySelector(".remover").addEventListener("click", function () {
            removerCategoria(categoria.id);
          });
          tableBody.appendChild(row);
        });
      })
      .catch((error) => {
        console.error("Erro ao listar categorias:", error);
      });
  }

  // Função para editar categoria
  function editarCategoria(id) {
    var novoNome = prompt("Digite o novo nome da categoria:");
    if (novoNome === null || novoNome === "") {
      alert("Nome da categoria não pode ser vazio!");
      return;
    }
    fetch(`http://localhost:3000/categorias/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ descricao: novoNome }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Categoria editada com sucesso!");
        loadCategoriaTable();
      })
      .catch((error) => {
        console.error("Erro ao editar categoria:", error);
      });
  }

  // Função para remover categoria
  function removerCategoria(id) {
    if (confirm("Tem certeza que deseja remover esta categoria?")) {
      fetch(`http://localhost:3000/categorias/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Categoria removida com sucesso!");
          loadCategoriaTable();
        })
        .catch((error) => {
          console.error("Erro ao remover categoria:", error);
        });
    }
  }

  loadCategoriaTable();
});
