

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
});
