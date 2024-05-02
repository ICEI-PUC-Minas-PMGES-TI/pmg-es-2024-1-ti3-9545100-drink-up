const freteGratisOriginal = document.getElementById('frete-gratis').value;
const freteFixoOriginal = document.getElementById('frete-fixo').value;


// Carrega valores padrão ao carregar a página
window.onload = function() {
fetchFreteValues()
  // Buscar os valores de frete padrão
  fetch('/')
    .then(response => response.json())
    .then(data => {
      // Definir os valores obtidos nos campos de entrada
      freteGratisInput.value = data.freteGratis;
      freteFixoInput.value = data.freteFixo;    
    })
};

function abrirValidacao() {
    // Mostrar o popup de validação
    document.getElementById('validacao-popup').style.display = 'block';
  }
  
  function salvarFreteValues() {
    // Obter os novos valores de frete dos campos de entrada
    const freteGratis = document.getElementById('frete-gratis').value;
    const freteFixo = document.getElementById('frete-fixo').value;
  }
  
  function fecharValidacao() {
    // Fechar o popup de validação
    document.getElementById('validacao-popup').style.display = 'none';
    }

