const carrinhoService = require('../services/carrinhoService');

class CarrinhoController{

    //Recebe um array de produtos e chama o service para iterar e adicionar a lista
    async adicionarCarrinho(req, res) {
        try {
            const { listaProdutos } = req.body;
            const carrinho = await carrinhoService.adicionarCarrinho(listaProdutos);
            console.log('\n\nCriou certo hehehe');
            res.status(201).json(carrinho);
        } catch (error) {
          console.error('Erro ao adicionar produto no carrinho:', error);
          res.status(500).json({ message: 'Erro ao adicionar produto no carrinho' });
        }
    }

}

module.exports = CarrinhoController;