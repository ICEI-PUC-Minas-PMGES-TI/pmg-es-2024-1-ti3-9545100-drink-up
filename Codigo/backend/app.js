const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('./connection.js').database
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
  GET  -  LISTAR
  POST - CRIAR
  PUT  - UPDATE
  DELETE - DELETAR
*/

//ROTA: LOCALHOST:3000/ | END POINT

//ROTA DE BUSCA DE USUARIO
app.get('/', (req, res) => {
  mysql.connect((err) => {

    if (err) { return res.status(500).send({ error: err }) }

    const query = "SELECT * FROM tb_cliente";

    mysql.query(query, [], (err, results) => {

      if (err) { return res.status(500).send({ error: err }) }

      if (results.length < 1) {
        return res.status(200).send({ message: "Usuário não encontrado!" })
      }

      return res.status(200).send({message: "Usuários encontrados!", result: results})
    })
  })
});


// cadastrar um novo usuário

app.post('/api/usuarios', (req, res) => {

  const { nome,data_nascimento,cpf,email,rua,numero,complemento,bairro,cidade,cep,telefone,senha,confirmar_senha } = req.body;

  // inserir os dados na tabela do banco de dados
  const sql = `INSERT INTO tb_cliente (nome,data_nascimento,cpf,email,rua,numero,complemento,bairro,cidade,cep,telefone,senha,confirmar_senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [nome, data_nascimento, cpf, email, rua, numero, complemento, bairro, cidade, cep, telefone, senha, confirmar_senha];

  // executar a query
  mysql.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Erro ao cadastrar usuário no banco de dados' });
      throw err;
    }
    console.log('Usuário cadastrado com sucesso');

    res.status(200).send({ message: 'Usuário cadastrado com sucesso', user: result});
  });
});

// autenticar o login
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  // consulta se o usuário existe no banco de dados
  const sql = `SELECT * FROM tb_cliente WHERE email = ? AND senha = ?`;
  const values = [email, senha];

  mysql.query(sql, values, (err, result) => {
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

// iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
