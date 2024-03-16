const express = require('express');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

router.post('/cliente', clienteController.criarCliente);
router.get('/clientes/cpf/:cpf', clienteController.buscarClientePorCpf);
router.get('/clientes/:id', clienteController.buscarClientePorId);
router.get('/clientes', clienteController.listarTodosClientes);
router.put('/clientes/:id', clienteController.atualizarCliente);
router.delete('/clientes/:id', clienteController.excluirCliente);

module.exports = router;
