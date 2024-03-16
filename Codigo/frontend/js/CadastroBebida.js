document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnenviar').addEventListener('click', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value
        const categoria = document.getElementById('categoria').value
        const descricao = document.getElementById('descricao').value
        const qntd_estoque = document.getElementById('estoque').value
        const preco = document.getElementById('preco').value
        const imagem = document.getElementById('imagem').value

        fetch('http://localhost:3000/api/create-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                categoria: categoria,
                descricao: descricao,
                qntd_estoque : qntd_estoque,
                valor: preco,
                imagem: imagem
            } ) } )
                .then(response => response.json())
                .then(data => { console.log(data) })
                .catch(error => { console.log(error); });
        });
    });