const jwt = require('jsonwebtoken');
const SECRET = 'drinkupTIS3';

const autenticacao = (perfilUsuario) => (req, res, next) => {
  // Se a rota não exigir autenticação, permitir o acesso sem token
  if (!req.route.authenticated) {
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

    // Verificação do perfil e status do usuário
    if (req.route.authenticated && (req.perfil !== perfilUsuario || req.status !== '1')) {
      return res.status(403).end(); // Acesso negado
    }
    next();
  });
};

module.exports = autenticacao;
