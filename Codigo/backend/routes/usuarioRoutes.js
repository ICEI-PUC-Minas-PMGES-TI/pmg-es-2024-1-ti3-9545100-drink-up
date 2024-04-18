const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const autenticacao = require('../middlewares/autenticacao');

const router = express.Router();

// Rotas sem autenticação
router.post('/login', autenticacao(false), usuarioController.login);
router.post('/usuarios', autenticacao(false), usuarioController.criarUsuario);

// Rotas com autenticação
router.get('/usuarios', autenticacao(true) ,usuarioController.listarTodosUsuarios);
router.get('/usuarios/:id', autenticacao(false), usuarioController.buscarUsuarioPorId);
router.get('/usuarios/email/:email', autenticacao(true), usuarioController.buscarUsuarioPorEmail);
router.put('/usuarios/:id', autenticacao(false), usuarioController.atualizarUsuario);
router.delete('/usuarios/:id', autenticacao(false), usuarioController.excluirUsuario);

module.exports = router;
