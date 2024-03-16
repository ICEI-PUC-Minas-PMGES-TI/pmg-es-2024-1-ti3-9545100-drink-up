// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');

// const app = express();
// app.use(express.json());

// const db = mysql.createConnection({
//   host: '',
//   user: '',
//   database: '',
//   password: '',
// });

// app.post('/create-product', async (req, res) => {
//   const { nome, descricao, valor, id_imagem, id_categoria } = req.body;
//   try {
      
//     const query = `INSERT INTO tb_produto (nome, descricao, valor, id_imagem, id_categoria) VALUES (?, ?, ?, ?, ?)`;
//     const queryParams = [nome, descricao, valor, id_imagem, id_categoria];
//     const [rows] = await db.query(query, queryParams);
//     const [product] = await db.query('SELECT * FROM tb_produto WHERE id = ?', [rows.insertId]);
//     res.status(201).json(product[0]);
      
//   } catch (error) {
//     console.error('Error creating product:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.listen(3000, () => console.log('rodando'));
