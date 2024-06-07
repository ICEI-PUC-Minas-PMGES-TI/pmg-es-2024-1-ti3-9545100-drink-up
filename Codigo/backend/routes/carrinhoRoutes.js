const express = require('express');
const CarrinhoController  = require('../controllers/carrinhoController');
const autenticacao = require('../middlewares/autenticacao');

const router = express.Router();
const carrinhoController = new CarrinhoController();

router.post('/carrinho', autenticacao(true), carrinhoController.adicionarCarrinho);


module.exports = router;
