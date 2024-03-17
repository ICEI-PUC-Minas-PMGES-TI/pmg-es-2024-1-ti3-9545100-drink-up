const express = require('express');
const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

router.post('/usuarios', usuarioController.criarUsuario);
router.get('/usuarios', usuarioController.listarTodosUsuarios);
router.get('/usuarios/:id', usuarioController.buscarUsuarioPorId);
router.get('/usuarios/email/:email', usuarioController.buscarUsuarioPorEmail);
router.put('/usuarios/:id', usuarioController.atualizarUsuario);
router.delete('/usuarios/:id', usuarioController.excluirUsuario);

module.exports = router;