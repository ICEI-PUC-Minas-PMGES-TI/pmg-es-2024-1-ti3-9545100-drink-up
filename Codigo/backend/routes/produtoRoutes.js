const express = require('express');
const produtoController = require('../controllers/produtoController');

const router = express.Router();

router.post('/produtos', produtoController.criarProduto);
router.get('/produtos/nome/:nome', produtoController.buscarProdutoPorNome);
router.get('/produtos/:id', produtoController.buscarProdutoPorId);
router.get('/produtos', produtoController.listarTodosProdutos);
router.put('/produtos/:id', produtoController.atualizarProduto);
router.delete('/produtos/:id', produtoController.excluirProduto);

module.exports = router;
