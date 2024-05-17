// const bodyParser = require("body-parser");



// Carrega valores padrão ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
  const freteGratisOriginal = document.getElementById('frete-gratis');
  const freteFixoOriginal = document.getElementById('frete-fixo');

  console.log("dg")
  // Buscar os valores de frete padrão
  fetch('http://localhost:3000/fretes')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Definir os valores obtidos nos campos de entrada
      freteGratisOriginal.value = data.frete_gratis;
      freteFixoOriginal.value = data.frete_fixo; 
      
    })

console.log("frete");
});

function abrirValidacao() {
    // Mostrar o popup de validação
    document.getElementById('validacao-popup').style.display = 'block';
  }
  
  function salvarFreteValues() {
    // Obter os novos valores de frete dos campos de entrada
    const frete_gratis = document.getElementById('frete-gratis').value;
    const frete_fixo = document.getElementById('frete-fixo').value;
    const requestOptions = {
      method: "PUT", 
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': sessionStorage.getItem("authorization")
      },
      body: JSON.stringify({frete_gratis, frete_fixo}),
    }
    fetch('http://localhost:3000/fretes', requestOptions)
    fecharValidacao()
  }

  function fecharValidacao() {
    // Fechar o popup de validação
    document.getElementById('validacao-popup').style.display = 'none';
    }

