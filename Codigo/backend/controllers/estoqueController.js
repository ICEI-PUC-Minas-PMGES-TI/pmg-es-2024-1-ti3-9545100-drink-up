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
    },

    async listarEstoqueCompleto(req, res) {
        try {
            const estoque = await estoqueService.listarEstoqueCompleto();
            res.status(200).json(estoque);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async listarEstoquePorProduto(req, res) {
        try {
            const { nome } = req.params;
            const estoque = await estoqueService.listarEstoquePorProduto(nome);
            res.status(200).json(estoque);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async relatorioMovimentoEstoque(req, res) {
        try {
            const MovimentoEstoque = await estoqueService.relatorioMovimentoEstoque();
            res.status(200).json(MovimentoEstoque);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = estoqueController;
