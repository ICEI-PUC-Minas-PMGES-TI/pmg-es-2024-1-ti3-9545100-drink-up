document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const categoria = document.getElementById('categoria').value;
    const descricao = document.getElementById('descricao').value;
    const estoque = document.getElementById('estoque').value;
    const preco = document.getElementById('preco').value;

    fetch('http://localhost:3000/create-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        descricao,
        valor: preco, 
        id_categoria: categoria, 
        id_imagem: null, // ignorando imagem por enquanto
      }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  });
});
