const jwt = require('jsonwebtoken');
const SECRET = 'drinkupTIS3';

const autenticacao = (requerAutenticacao) => (req, res, next) => {
  // Se a rota não exigir autenticação, permitir o acesso sem token
  if (!requerAutenticacao) {
    return next();
  }

  // Verificação do token
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).end(); // Token não fornecido
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).end(); // Token inválido
    }
    req.id = decoded.id;
    req.perfil = decoded.perfil;
    req.status = decoded.status;
    
    next();
  });
};

module.exports = autenticacao;
