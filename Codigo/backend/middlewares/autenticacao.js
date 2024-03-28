const jwt = require('jsonwebtoken');


const autenticacao = (req, res, next) => {
    
    console.log('Token recebido:', req.headers.authorization);
    //Verifica se o usuário está autenticado
    if (req.session.usuario) {
      next(); // Permite o acesso à próxima função (rota)
    } else {
      res.status(401).json({ error: 'Não autorizado' }); // Retorna erro se não estiver autenticado
    }
  };
  
  module.exports = autenticacao;
  