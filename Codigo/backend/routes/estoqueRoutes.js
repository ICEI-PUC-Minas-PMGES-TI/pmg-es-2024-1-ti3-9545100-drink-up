const express = require('express');
const estoqueController = require('../controllers/estoqueController');

const router = express.Router();

router.post('/estoque', estoqueController.estoqueEntradaSaida);

module.exports = router;
