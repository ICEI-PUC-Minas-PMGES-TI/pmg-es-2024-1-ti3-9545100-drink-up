const express = require('express');
const clienteController = require('../controllers/clienteController');
const autenticacao = require('../middlewares/autenticacao');


const router = express.Router();

router.post('/clientes', autenticacao(false), clienteController.criarCliente);
router.get('/clientes/cpf/:cpf', autenticacao(false), clienteController.buscarClientePorCpf);
router.get('/clientes/:id', autenticacao(false), clienteController.buscarClientePorId);
router.get('/clientes/usuario/:idUsuario', autenticacao(false), clienteController.buscarClientePorIdUsuario);
router.get('/clientes', autenticacao(false), clienteController.listarTodosClientes);
router.put('/clientes/:id', autenticacao(false), clienteController.atualizarCliente);
router.delete('/clientes/:id', autenticacao(false), clienteController.excluirCliente);

module.exports = router;
