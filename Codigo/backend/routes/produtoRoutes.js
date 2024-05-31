const express = require('express');
const ProdutoController  = require('../controllers/produtoController');
const autenticacao = require('../middlewares/autenticacao');


const router = express.Router();
const produtoController = new ProdutoController();

router.post('/produtos', autenticacao(false), produtoController.criarProduto);
router.get('/produtos/nome/:nome', autenticacao(false), produtoController.buscarProdutoPorNome);
router.get('/produtos/:id', autenticacao(false), produtoController.buscarProdutoPorId);
router.get('/produtos', autenticacao(false), produtoController.listarTodosProdutos);
router.put('/produtos', autenticacao(false), produtoController.atualizarProduto);
router.put('/produtos/atualizar-estoque/:id', autenticacao(false), produtoController.atualizarEstoqueProduto);
router.delete('/produtos/:id', autenticacao(false), produtoController.excluirProduto);
router.get('/produtos/saida-bebidas', autenticacao(false), produtoController.saidaBebida);

module.exports = router;
