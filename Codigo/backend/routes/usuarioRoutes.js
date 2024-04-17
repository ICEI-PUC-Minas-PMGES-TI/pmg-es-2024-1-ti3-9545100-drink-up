const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const autenticacao = require('../middlewares/autenticacao');

const router = express.Router();

// Rotas sem autenticação
router.post('/login', usuarioController.login);
router.post('/usuarios', usuarioController.criarUsuario);

// Rotas com autenticação
router.get('/usuarios', autenticacao(true), usuarioController.listarTodosUsuarios);
router.get('/usuarios/:id', autenticacao(true), usuarioController.buscarUsuarioPorId);
router.get('/usuarios/email/:email', autenticacao(true), usuarioController.buscarUsuarioPorEmail);
router.put('/usuarios/:id', autenticacao(true), usuarioController.atualizarUsuario);
router.delete('/usuarios/:id', autenticacao(true), usuarioController.excluirUsuario);

module.exports = router;
