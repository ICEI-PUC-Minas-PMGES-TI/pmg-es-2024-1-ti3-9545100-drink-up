document.addEventListener("DOMContentLoaded", function () {
    // document
    //     .getElementById("btnenviar")
    //     .addEventListener("click", function (event) {
    //         event.preventDefault();

    //         const nome = document.getElementById("nome").value;
    //         const categoria = document.getElementById("categoria").value;
    //         const descricao = document.getElementById("descricao").value;
    //         const qntd_estoque = document.getElementById("estoque").value;
    //         const preco = document.getElementById("preco").value;
    //         const imagem = document.getElementById("imagem").value;

    //         fetch("http://localhost:3000/api/create-product", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 nome: nome,
    //                 categoria: categoria,
    //                 descricao: descricao,
    //                 qntd_estoque: qntd_estoque,
    //                 valor: preco,
    //                 imagem: imagem,
    //             }),
    //         })
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 console.log(data);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     });

    var modal = document.getElementById("modalCategoria");

    // Pega o select da categoria
    var selectCategoria = document.getElementById("selectCategoria");

    // Pega o elemento <span> que fecha o modal
    var span = document.querySelector(".close");

    // Evento change para o select da categoria
    selectCategoria.addEventListener("change", function () {
        if (selectCategoria.value === "adicionar") {
            // Abre o modal para adicionar uma nova categoria
            modal.style.display = "block";
        }
    });

    // Quando o usuário clica em <span> (x), fecha o modal
    span.onclick = function () {
        modal.style.display = "none";
    };

    // Quando o usuário clica fora do modal, fecha-o
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // Pega o botão que adiciona novo campo
    var btnNovo = document.getElementById("btnNovo");

    // Evento de clique para o botão Novo
    btnNovo.addEventListener('click', function () {
        var container = document.getElementById("novoCampoCategoria");
        
        // Limpa o contêiner para evitar múltiplos campos
        container.innerHTML = '';

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
        btnSave.addEventListener('click', function () {
            // Aqui você coloca a lógica para salvar a nova categoria
            // Por exemplo, você pode enviar o valor de input para o seu servidor
            var nomeCategoria = input.value;
            console.log("Salvar categoria:", nomeCategoria);
            // Aqui você pode adicionar uma chamada fetch para salvar a categoria via API
        });

        // Insere os elementos no contêiner
        container.appendChild(input);
        container.appendChild(btnSave);
    });
});