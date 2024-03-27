const express = require('express');
const categoriaController = require('../controllers/categoriaController');

const router = express.Router();

router.post('/categorias', categoriaController.criarCategoria);
router.get('/categorias/:id', categoriaController.buscarCategoriaPorId);
router.get('/categorias', categoriaController.listarTodasCategorias);
router.put('/categorias/:id', categoriaController.atualizarCategoria);
router.delete('/categorias/:id', categoriaController.excluirCategoria);

module.exports = router;
