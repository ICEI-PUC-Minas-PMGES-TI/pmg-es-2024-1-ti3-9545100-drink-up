

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btncadastrar').addEventListener('click', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const categoria = document.getElementById('selectCategoria').value;
        const descricao = document.getElementById('descricao').value;
        const tamGarrafa = document.getElementById('tamGarrafa').value;
        const valor = document.getElementById('valor').value;
        const imagem = document.getElementById('imagem').value;

        fetch('http://localhost:3000/produtos', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                idCategoria: categoria,
                descricao: descricao,
                tamGarrafa : tamGarrafa,
                valor: valor,   
                imagem: imagem
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); 

            window.location.href = 'ListagemDeBebidas.html';
        })
        .catch(error => {
            console.error('Erro ao cadastrar bebida:', error);
        });
    });


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
        

        document.addEventListener("DOMContentLoaded", function() {
            // Referência ao seu elemento select
            const selectCategoria = document.getElementById('selectCategoria');
            
            // Adiciona a opção desabilitada como a primeira opção
            const placeholderOption = document.createElement('option');
            placeholderOption.text = 'SELECIONE UMA CATEGORIA';
            placeholderOption.disabled = true;
            placeholderOption.selected = true; // Para que a opção apareça selecionada por padrão
            selectCategoria.add(placeholderOption, selectCategoria.options[0]);
    
            // Inicializa a biblioteca multi-select-tag
            new MultiSelectTag('selectCategoria');
        });
    });
});
