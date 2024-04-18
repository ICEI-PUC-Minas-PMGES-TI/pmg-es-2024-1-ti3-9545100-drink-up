const jwt = require('jsonwebtoken');
const SECRET = 'drinkupTIS3';

const autenticacao = (requerAutenticacao) => (req, res, next) => {

  if (requerAutenticacao) {

    const token = req.headers['x-access-token'];

    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido' });
      }
      
      
      req.id = decoded.id;
      req.perfil = decoded.perfil;
      req.status = decoded.status;

      next();
    });
    
  }
  else{
    next();
  }

};

module.exports = autenticacao;
