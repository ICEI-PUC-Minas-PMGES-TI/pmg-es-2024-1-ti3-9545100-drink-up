const express = require('express');
const estoqueController = require('../controllers/estoqueController');

const router = express.Router();

router.post('/estoque', estoqueController.estoqueEntradaSaida);
router.get('/estoque', estoqueController.listarEstoqueCompleto);
router.get('/estoque/:nome', estoqueController.listarEstoquePorProduto);

module.exports = router;
