const express = require('express');
const pedidoController = require('../controllers/pedidoController');
const autenticacao = require('../middlewares/autenticacao');
const router = express.Router();

router.post('/pedidos', autenticacao(false), pedidoController.criarPedido);
router.get('/pedidos', autenticacao(false), pedidoController.listarTodosPedidos);
router.get('/pedidos/:id', autenticacao(false), pedidoController.buscarPedidoPorId);
router.put('/pedidos/:id', autenticacao(false), pedidoController.atualizarPedido);
router.delete('/pedidos/:id', autenticacao(false), pedidoController.excluirPedido);

module.exports = router;