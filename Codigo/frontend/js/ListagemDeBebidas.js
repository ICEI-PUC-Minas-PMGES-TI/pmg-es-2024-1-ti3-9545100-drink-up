// Seleciona o botão "Editar"
const botaoEditar = document.querySelector('.editar');

// Seleciona o popup
const popup = document.getElementById('popup');

// Adiciona evento de clique ao botão "Editar"
botaoEditar.addEventListener('click', function() {
    // Exibe o popup
    popup.style.display = 'flex';
});

// Seleciona o botão "Fechar" dentro do popup
const botaoFecharPopup = document.getElementById('fecharPopup');

// Adiciona evento de clique ao botão "Fechar"
botaoFecharPopup.addEventListener('click', function() {
    // Oculta o popup
    popup.style.display = 'none';
});
