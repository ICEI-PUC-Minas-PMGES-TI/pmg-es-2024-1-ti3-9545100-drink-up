const produtoService = require('./produtoService');
const carrinho = [];

async function adicionarCarrinho(listaProdutos){
    try {

        //Percorrendo a lista de produtos recebida por parâmetro
        for (let itemLista of listaProdutos) {
            const produto = await produtoService.buscarProdutoPorId(itemLista.id);
            carrinho.push(produto);
        }
      return carrinho;
    } catch (error) {
        console.error('Erro ao adicionar produto no carrinho:', error);
        throw new Error('Erro ao adicionar produto no carrinho');
    }
}

module.exports = {
    adicionarCarrinho
  };