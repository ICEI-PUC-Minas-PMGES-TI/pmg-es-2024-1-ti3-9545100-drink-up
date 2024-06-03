const express = require('express');
const imagemController = require('../controllers/imagemController'); 

const router = express.Router();

router.post('/imagens', imagemController.uploadImagem);
router.get('/imagens/:id', imagemController.buscarImagemPorId);
router.get('/imagens', imagemController.listarTodasImagens);
router.put('/imagens/:id', imagemController.atualizarImagem);
router.delete('/imagens/:id', imagemController.excluirImagem);

module.exports = router;
