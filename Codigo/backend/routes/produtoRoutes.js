const express = require('express');
const ProdutoController  = require('../controllers/produtoController');

const router = express.Router();
const produtoController = new ProdutoController();

router.post('/produtos', produtoController.criarProduto);
router.get('/produtos/nome/:nome', produtoController.buscarProdutoPorNome);
router.get('/produtos/:id', produtoController.buscarProdutoPorId);
router.get('/produtos', produtoController.listarTodosProdutos);
router.put('/produtos', produtoController.atualizarProduto);
router.put('/produtos/atualizar-estoque/:id', produtoController.atualizarEstoqueProduto);
router.delete('/produtos/:id', produtoController.excluirProduto);

module.exports = router;
