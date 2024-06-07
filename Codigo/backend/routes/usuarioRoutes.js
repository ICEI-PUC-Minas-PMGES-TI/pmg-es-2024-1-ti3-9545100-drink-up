const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const autenticacao = require('../middlewares/autenticacao');

const router = express.Router();

// Rotas sem autenticação
router.post('/login', autenticacao(false), usuarioController.login);
router.post('/usuarios', autenticacao(false), usuarioController.criarUsuario);

// Rotas com autenticação
router.get('/usuarios', autenticacao(true, 'admin') ,usuarioController.listarTodosUsuarios);
router.get('/usuarios/:id', autenticacao(false, 'admin'), usuarioController.buscarUsuarioPorId);
router.get('/usuarios/email/:email', autenticacao(false, 'admin'), usuarioController.buscarUsuarioPorEmail);
router.put('/usuarios/:id', autenticacao(false, 'admin'), usuarioController.atualizarUsuario);
router.put('/usuarios/alterarSenha/:id', autenticacao(true, 'cliente'), usuarioController.alterarSenha);
router.delete('/usuarios/:id', autenticacao(false, 'admin'), usuarioController.excluirUsuario);

module.exports = router;
