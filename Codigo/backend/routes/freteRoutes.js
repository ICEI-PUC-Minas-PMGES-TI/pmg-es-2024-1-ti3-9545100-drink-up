const express = require('express');
const freteController = require('../controllers/freteController');
const autenticacao = require('../middlewares/autenticacao');

const router = express.Router();

// Rota para mostrar todos os fretes
router.get('/fretes', autenticacao(false), freteController.listarTodosFretes);

// Rota para atualizar o frete 
router.put('/fretes', autenticacao(false), freteController.atualizarFrete);

// Rota para frete fixo
router.get('/fretes/frete-fixo', autenticacao(false), freteController.buscarFreteFixo);

// Rota para frete grátis
router.get('/fretes/frete-gratis', autenticacao(false), freteController.buscarFreteGratis);

router.post('/frete/calcular', autenticacao(false), freteController.calcularFrete);

module.exports = router;
