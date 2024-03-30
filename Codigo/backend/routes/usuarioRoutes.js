const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const autenticacao = require('../middlewares/autenticacao')

const router = express.Router();

//Rotas sem autenticacao
router.post('/login', usuarioController.login);
router.post('/usuarios', usuarioController.criarUsuario);

//Rotas autenticadas
router.use(autenticacao);
router.get('/usuarios', usuarioController.listarTodosUsuarios);
router.get('/usuarios/:id', usuarioController.buscarUsuarioPorId);
router.get('/usuarios/email/:email', usuarioController.buscarUsuarioPorEmail);
router.put('/usuarios/:id', usuarioController.atualizarUsuario);
router.delete('/usuarios/:id', usuarioController.excluirUsuario);

module.exports = router;