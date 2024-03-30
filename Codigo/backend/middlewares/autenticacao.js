const jwt = require('jsonwebtoken');
const SECRET = 'drinkupTIS3';


const autenticacao = (req, res, next) => {

  console.log('Token recebido:', req.headers.authorization);
  //Verifica se o usuário está autenticado
  const token = req.headers['x-access-token'];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).end();
    }
    req.id = decoded.id;
    req.perfil = decoded.perfil;
    req.status = decoded.status;
    next();
  })
};

module.exports = autenticacao;
