document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btncadastrar").addEventListener("click", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
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
                    nome: nome,
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
            for (categoria of data) {
                inputSelect.innerHTML += `<option value="${categoria.id}">${categoria.descricao}</option>`;
            }
        })
        .catch(error => {
            console.error("Erro ao listar categorias:", error);
        });
    }

    loadCategoriaInputSelect();

    function loadCategoriaTable() {
        fetch("http://localhost:3000/categorias", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("tabela-body");
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
        .then(response => response.json())
        .then(data => {
            alert("Categoria editada com sucesso!");
            loadCategoriaTable();
        })
        .catch(error => {
            console.error("Erro ao editar categoria:", error);
        });
    }

    function removerCategoria(id) {
        if (confirm("Tem certeza que deseja remover esta categoria?")) {
            fetch(`http://localhost:3000/categorias/${id}`, {
                method: "DELETE",
            })
            .then(response => response.json())
            .then(data => {
                alert("Categoria removida com sucesso!");
                loadCategoriaTable();
            })
            .catch(error => {
                console.error("Erro ao remover categoria:", error);
            });
        }
    }

    loadCategoriaTable();
});
