const express = require('express');
const cors = require('cors');
const Database = require('./Database.js');


const app = express(); // cria express
const port = 3000; // configura porta


const database = new Database(); // cria instancia do bd

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Hello, World! Your server is up and running.');
}); // confirmação


app.post('/create-product', async (req, res) => {
  const { nome, categoria, descricao, estoque, preco } = req.body;

  try {
      console.log("Received product data:", req.body);

      res.status(201).send({ message: "Product created successfully" });
  } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).send({ error: "Failed to create product" });
  }
});

async function startServer() { // incializa server
  try {
    await database.connect();
    console.log('Database connection established successfully.'); // conexão com bd bem sucedida
    app.listen(port, () => {
      console.log(`Server running on port ${port}.`); informa da porta
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error); // erro
  }
}

startServer();
