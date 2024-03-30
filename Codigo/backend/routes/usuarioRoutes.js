const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const autenticacao = require('../middlewares/autenticacao')

const router = express.Router();

// Rotas sem autenticação
router.post('/login', usuarioController.login);
router.post('/usuarios', usuarioController.criarUsuario);

// Rotas com autenticação
router.get('/usuarios', autenticacao('admin'), usuarioController.listarTodosUsuarios);
router.get('/usuarios/:id', autenticacao('admin'), usuarioController.buscarUsuarioPorId);
router.get('/usuarios/email/:email', autenticacao('admin'), usuarioController.buscarUsuarioPorEmail);
router.put('/usuarios/:id', autenticacao('admin'), usuarioController.atualizarUsuario);
router.delete('/usuarios/:id', autenticacao('admin'), usuarioController.excluirUsuario);

module.exports = router;
