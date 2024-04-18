const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const autenticacao = require('../middlewares/autenticacao');

const router = express.Router();

router.post('/categorias', autenticacao(false), categoriaController.criarCategoria);
router.get('/categorias/:id', autenticacao(false), categoriaController.buscarCategoriaPorId);
router.get('/categorias', autenticacao(false), categoriaController.listarTodasCategorias);
router.put('/categorias/:id', autenticacao(false), categoriaController.atualizarCategoria);
router.delete('/categorias/:id', autenticacao(false), categoriaController.excluirCategoria);

module.exports = router;
