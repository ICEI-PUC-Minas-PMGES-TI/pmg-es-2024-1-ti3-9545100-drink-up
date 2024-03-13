const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000; 

// configuração do banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'drinkup_master',
  password: 'drinkup',
  database: 'drink_up'
});

// conectar no banco de dados
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado no MySQL');
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cadastrar um novo usuário
app.post('/api/usuarios', (req, res) => {
  const userData = req.body;
  const { nome, dataNascimento, cpf, email, rua, numero, complemento, bairro, cidade, cep, telefone, senha, confirmar_senha } = userData;

  // inserir os dados na tabela do banco de dados
  const sql = `INSERT INTO usuarios (nome, data_nascimento, cpf, email, rua, numero, complemento, bairro, cidade, cep, telefone, senha,confirmar_senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
  const values = [nome, dataNascimento, cpf, email, rua, numero, complemento, bairro, cidade, cep, telefone, senha, confirmar_senha];

  // executar a query
  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Erro ao cadastrar usuário no banco de dados' });
      throw err;
    }
    console.log('Usuário cadastrado com sucesso');
    res.status(200).send({ message: 'Usuário cadastrado com sucesso' });
  });
});

// iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
