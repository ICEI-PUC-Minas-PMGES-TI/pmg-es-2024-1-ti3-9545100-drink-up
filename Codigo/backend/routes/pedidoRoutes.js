const express = require('express');
const pedidoController = require('../controllers/pedidoController');
const autenticacao = require('../middlewares/autenticacao');
const router = express.Router();

router.post('/pedidos', autenticacao(false), pedidoController.criarPedido);
router.get('/pedidos', autenticacao(false), pedidoController.listarTodosPedidos);
router.get('/pedidos/:id', autenticacao(false), pedidoController.buscarPedidoPorId);
router.get('/pedidos/listarItensDoPedido/:id', autenticacao(false), pedidoController.listarItensDoPedido);
router.patch('/pedidos/endereco/:id', autenticacao(false), pedidoController.alterarEnderecoPedido);
router.put('/pedidos/:id', autenticacao(false), pedidoController.atualizarPedido);
router.put('/status_pedidos/:id', autenticacao(false), pedidoController.atualizarStatusPedido);


//router.delete('/pedidos/:id', autenticacao(false), pedidoController.excluirPedido);

  

  router.get('/pedido-com-frete/:id', async (req, res) => {
    try {
      const idPedido = req.params.id;
  
      // Buscar o pedido por ID
      const pedido = await pedidoService.buscarPedidoPorId(idPedido);
  
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }
  
      // Calcular o valor do frete
      const frete = await freteService.calcularFrete(pedido.valor_pedido);
  
      // Calcular o valor total do pedido com o frete
      const valorTotalComFrete = pedido.valor_pedido + frete;
  
      // Retornar o valor total do pedido com o frete
      res.json({ valorTotalComFrete });
    } catch (error) {
      console.error('Erro ao obter o valor do pedido com frete:', error);
      res.status(500).json({ error: 'Erro ao obter o valor do pedido com frete' });
    }
  });



module.exports = router;