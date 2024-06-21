document.addEventListener("DOMContentLoaded", function () {
    // Função para cadastrar uma bebida
    document.getElementById("btncadastrar").addEventListener("click", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value + "-" + Date.now();  // Gera um nome único para a imagem
        const categoria = document.getElementById("selectCategoria").value;
        const descricao = document.getElementById("descricao").value;
        const tamGarrafa = document.getElementById("tamGarrafa").value;
        const valor = document.getElementById("valor").value;
        const imagemUrl = document.getElementById("imagem").value;
        const estoque_atual = 1;

        fetch("http://localhost:3000/imagens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nome: nome, caminho: imagemUrl }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar imagem: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const id_imagem = data.id;
            console.log('Imagem cadastrada com ID:', id_imagem);

            return fetch("http://localhost:3000/produtos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome: document.getElementById("nome").value,  // Usando o nome original para o produto
                    id_categoria: categoria,
                    descricao: descricao,
                    tam_garrafa: tamGarrafa,
                    valor: valor,
                    estoque_atual: estoque_atual,
                    id_imagem: id_imagem,
                }),
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar bebida: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Bebida cadastrada com sucesso:', data);
            window.location.href = "ListagemDeBebidas.html";
        })
        .catch(error => {
            console.error("Erro ao cadastrar bebida:", error);
        });
    });

    // Função para carregar categorias no select
    function loadCategoriaInputSelect() {
        const inputSelect = document.getElementById("selectCategoria");
        fetch("http://localhost:3000/categorias", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => {
            for (let categoria of data) {
                inputSelect.innerHTML += `<option value="${categoria.id}">${categoria.descricao}</option>`;
            }
        })
        .catch(error => {
            console.error("Erro ao listar categorias:", error);
        });
    }

    // Função para carregar a tabela de categorias
    function loadCategoriaTable() {
        const tableBody = document.getElementById("tabela-body");
        fetch("http://localhost:3000/categorias", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => {
            tableBody.innerHTML = "";
            data.forEach(categoria => {
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
        .catch(error => {
            console.error("Erro ao listar categorias:", error);
        });
    }

    // Função para editar uma categoria
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
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao editar categoria: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert("Categoria editada com sucesso!");
            loadCategoriaTable();
        })
        .catch(error => {
            console.error("Erro ao editar categoria:", error);
        });
    }

    // Função para remover uma categoria
    function removerCategoria(id) {
        if (confirm("Tem certeza que deseja remover esta categoria?")) {
            fetch(`http://localhost:3000/categorias/${id}`, {
                method: "DELETE",
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao excluir categoria');
                }
                return response.json();
            })
            .then(data => {
                alert("Categoria removida com sucesso!");
                loadCategoriaTable();
            })
            .catch(error => {
                console.error("Erro ao remover categoria:", error);
                alert("Erro ao remover categoria. Verifique o console para mais detalhes.");
            });
        }
    }

    // Inicialização
    loadCategoriaInputSelect();
    loadCategoriaTable();

    // Eventos do modal de categoria
    var modal = document.getElementById("modalCategoria");
    var selectCategoria = document.getElementById("selectCategoria");
    var span = document.querySelector(".close");

    selectCategoria.addEventListener("change", function () {
        if (selectCategoria.value === "adicionar") {
            modal.style.display = "block";
        }
    });

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    var btnNovo = document.getElementById("btnNovo");
    btnNovo.addEventListener("click", function () {
        var container = document.getElementById("novoCampoCategoria");
        container.innerHTML = "";

        var input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Nome da nova categoria";
        input.classList.add("input-novo");

        var btnSave = document.createElement("button");
        btnSave.innerText = "Salvar";
        btnSave.classList.add("btn", "btn-primary");

        btnSave.addEventListener("click", function () {
            var nomeCategoria = input.value;
            fetch("http://localhost:3000/categorias", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ descricao: nomeCategoria }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const novaOpcao = document.createElement("option");
                novaOpcao.value = data.id;
                novaOpcao.innerText = data.descricao;
                selectCategoria.appendChild(novaOpcao);
                modal.style.display = "none";

                loadCategoriaTable();
            })
            .catch(error => {
                console.error("Erro ao adicionar categoria:", error);
            });
        });

        container.appendChild(input);
        container.appendChild(btnSave);
    });
});