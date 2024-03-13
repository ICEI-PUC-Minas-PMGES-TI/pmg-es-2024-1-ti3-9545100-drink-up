const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000; 

// Configuração do MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'drinkup_master',
  password: 'drinkup',
  database: 'drink_up'
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL');
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// autenticar o login 
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  // consulta se o usuário existe no banco de dados
  const sql = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`;
  const values = [email, senha];

  
  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Erro ao autenticar usuário no banco de dados' });
      throw err;
    }

    // Verifica se encontrou um usuário 
    if (result.length > 0) {
      res.status(200).send({ message: 'Login bem-sucedido', user: result[0] });
    } else {
      res.status(401).send({ error: 'Credenciais inválidas' });
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
