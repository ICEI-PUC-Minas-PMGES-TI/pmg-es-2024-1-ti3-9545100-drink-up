const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

const db = mysql.createConnection({ // seguindo esquema estabelecido no BD
    host: 'localhost',
    user: 'drinkup_master',
    database: 'drink_up',
    password: 'drinkup',
});

app.post('/create-product', (req, res) => {
    const { nome, descricao, valor, estoque, id_categoria } = req.body; 
    const query = `INSERT INTO tb_produto (nome, descricao, valor, id_categoria) VALUES (?, ?, ?, ?)`;
    const queryParams = [nome, descricao, valor, id_categoria]; 
    db.query(query, queryParams, (error, results) => {
        if (error) {
            console.error('Error creating product:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // retorna objeto criado
        db.query('SELECT * FROM tb_produto WHERE id = ?', [results.insertId], (error, results) => {
            if (error) {
                console.error('Error fetching product:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(201).json(results[0]);
        });
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
