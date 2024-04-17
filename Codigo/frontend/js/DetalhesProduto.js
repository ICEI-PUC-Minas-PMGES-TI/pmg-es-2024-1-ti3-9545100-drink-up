const fetch = require('node-fetch');

const productId = window.location.search.slice(5).trim();

fetch(`/produtos/${productId}`)
  .then((response) => response.json())
  .then((produto) => {
    // Atualize os elementos HTML com os dados do produto
    document.querySelector('h1').textContent = `${produto.nome} ${produto.tam_garrafa}ml`;
    document.querySelector('h3').textContent = `R$ ${produto.valor}`;
    document.querySelector('p').textContent = produto.descricao;

    // Atualize a imagem do produto
    const productImage = document.querySelector('#imagem img');
    productImage.src = produto.imagem;
    productImage.alt = produto.nome;
  });

  
//Botões
const value = document.getElementById('value');
const plusbutton = document.getElementById('plus');
const minusbutton = document.getElementById('minus');
const reset = document.getElementById('reset');

const updateValue = () => {
    value.innerHTML = count;
};

let count = 0;
let intervalId = 0;

plusbutton.addEventListener('mousedown', () =>{
    count += 1;
    updateValue();
    intervalId = setInterval(()=> {
        count += 1;
        updateValue();
    }, 100);
});

minusbutton.addEventListener('mousedown', () =>{
    if (count > 0) { // Verifica se o contador é maior que zero antes de subtrair
        count -= 1;
        updateValue();
        intervalId = setInterval(()=> {
            if (count > 0) { // Verifica novamente se o contador é maior que zero antes de subtrair
                count -= 1;
                updateValue();
            }
        }, 100);
    }
});

document.addEventListener('mouseup', () => clearInterval(intervalId));

reset.addEventListener('click', () =>{
    count = 0; 
    updateValue();
})