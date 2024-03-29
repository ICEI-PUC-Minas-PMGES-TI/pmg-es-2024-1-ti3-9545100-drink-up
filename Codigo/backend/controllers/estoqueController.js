const estoqueService = require('../services/estoqueService');

const estoqueController = {

    async estoqueEntradaSaida(req, res) {
        try {
            const { idProduto, quantidade, tipo, observacao } = req.body;
            const estoque = await estoqueService.estoqueEntradaSaida(idProduto, quantidade, tipo, observacao);
            res.status(200).json({ message: 'Estoque atualizado com sucesso', estoque });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}

module.exports = {
    estoqueController
};
