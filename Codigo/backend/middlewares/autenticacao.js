const jwt = require('jsonwebtoken');
const SECRET = 'drinkupTIS3';

const autenticacao = (requerAutenticacao, permissao) => (req, res, next) => {

  //Verifica se a rota exige requisição. Caso exija, prossegue com as validações
  if (requerAutenticacao) {

    const token = req.headers['x-access-token'];
    //Verifica se o token foi fornecido
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    //Validação e decodificação do token
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Token expirado' });
        }
        return res.status(401).json({ error: 'Token inválido' });
      }

      req.perfil = decoded.perfil;
      req.status = decoded.status;

      //Verifica se o perfil definido para acesso na rota condiz com o perfil do token gerado
      if (req.perfil == 'admin'|| permissao == req.perfil || !permissao && req.status == 1) {
        next();
      }
      else{
        return res.status(401).json({ error: 'Usuário inativo ou não possui permissão de acesso' });
      }

    });
    
  }
  else{
    next();
  }

};

module.exports = autenticacao;
