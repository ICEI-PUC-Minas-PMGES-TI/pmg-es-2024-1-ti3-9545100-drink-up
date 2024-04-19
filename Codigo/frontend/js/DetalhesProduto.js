import {Carrinho} from './utils/Carrinho.js'

document.addEventListener("DOMContentLoaded", async function () {
  const productId = new URLSearchParams(window.location.search).get("id");

  let product = await fetch(`http://localhost:3000/produtos/${productId}`)
    .then((response) => response.json())
    .then((produto) => {

      document.querySelector(
        "h1"
      ).textContent = `${produto.nome} ${produto.tam_garrafa}ml`;
      document.querySelector("h3").textContent = `R$ ${produto.valor}`;
      document.querySelector("p").textContent = produto.descricao;

      const productImage = document.querySelector("#imagem img");
      productImage.src = produto.imagem;
      productImage.alt = produto.nome;

      return produto;
    })
    .catch((error) =>
      console.error("Falha ao buscar detalhes do produto:", error)
    );

  const value = document.getElementById("value");
  const plusbutton = document.getElementById("plus");
  const minusbutton = document.getElementById("minus");
  const reset = document.getElementById("reset");

  const updateValue = () => {
    value.innerHTML = count;
  };

  let count = 0;
  let intervalId = 0;

  plusbutton.addEventListener("mousedown", () => {
    count += 1;
    updateValue();
    intervalId = setInterval(() => {
      count += 1;
      updateValue();
    }, 100);
  });

  minusbutton.addEventListener("mousedown", () => {
    if (count > 0) {
      count -= 1;
      updateValue();
      intervalId = setInterval(() => {
        if (count > 0) {
        }
      }, 100);
    }
  });

  document.addEventListener("mouseup", () => clearInterval(intervalId));
  reset.addEventListener("click", () => {
    count = 0;
    updateValue();
  });

  document.getElementById('add-button').addEventListener('click', () => {

    const carrinho = new Carrinho();

    carrinho.adicionarProduto({
      id: product.id,
      nome: product.nome,
      imagem: product.id_imagem,
      valor: product.valor,
      quant: count
    });

    alert("Produto Adicionado ao carrinho!");

    location.href = "Carrinho.html";
  })
});
