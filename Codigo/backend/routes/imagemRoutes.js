const express = require('express');
const multer = require('multer');
const clienteController = require('../controllers/imagemController');

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
  
  router.post('imagem/upload', upload.single('imagem'), ImagemController.uploadImagem);
  router.get('imagem/:id', ImagemController.buscarImagem);
  
  module.exports = router;