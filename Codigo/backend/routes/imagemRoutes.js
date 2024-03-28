const express = require('express');
const multer = require('multer');
const imagemController = require('../controllers/imagemController'); // Corrigido o nome do controller

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../imagens/'); // O diretório onde as imagens serão armazenadas
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // O nome original do arquivo será mantido
    }
});

const upload = multer({ storage });

router.post('/imagem/upload', upload.single('imagem'), imagemController.uploadImagem); // Corrigido o nome do controller
router.get('/imagem/:id', imagemController.buscarImagem); // Corrigido o nome do controller

module.exports = router;
