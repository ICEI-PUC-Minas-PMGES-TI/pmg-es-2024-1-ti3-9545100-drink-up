const express = require('express');
const estoqueController = require('../controllers/estoqueController');
const autenticacao = require('../middlewares/autenticacao');


const router = express.Router();

router.post('/estoque', autenticacao(false), estoqueController.estoqueEntradaSaida);
router.get('/estoque', autenticacao(false), estoqueController.listarEstoqueCompleto);
router.get('/estoque/:nome', autenticacao(false), estoqueController.listarEstoquePorProduto);

module.exports = router;
