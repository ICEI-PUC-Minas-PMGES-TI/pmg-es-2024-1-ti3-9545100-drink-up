const freteService = require('../services/freteService');

const freteController = {

  async listarTodosFretes(req, res) {
    try {
      const fretes = await freteService.listarFretes();
      res.json(fretes);
    } catch (error) {
      console.error('Erro ao listar fretes:', error);
      res.status(500).json({ message: 'Erro ao listar fretes' });
    }
  },


  async atualizarFrete(req, res) {
    console.log(req.body)
    const { frete_fixo, frete_gratis } = req.body;
    try {
      const frete = await freteService.atualizarFrete(frete_fixo, frete_gratis);
      res.json(frete);
    }  catch (error) {
      console.error('Erro ao atualizar os fretes:', error);
      res.status(500).json({ message: 'Erro ao atualizar os fretes' });
    }
  },

  // async atualizarFreteGratis(req, res) {
  //   const { freteGratis } = req.body;
  //   try {
  //     const resultado = await freteService.atualizarFreteGratis(freteGratis);
  //     res.json(resultado);
  //   } catch (error) {
  //     console.error('Erro ao atualizar o frete grátis:', error);
  //     res.status(500).json({ message: 'Erro ao atualizar o frete grátis' });
  //   }
  // },

  async buscarFreteFixo(req, res) {
    try {
      const freteFixo = await freteService.buscarFreteFixo();
      res.json(freteFixo);
    } catch (error) {
      console.error('Erro ao buscar o frete fixo:', error);
      res.status(500).json({ message: 'Erro ao buscar o frete fixo' });
    }
  },

  async buscarFreteGratis(req, res) {
    try {
      const freteGratis = await freteService.buscarFreteGratis();
      res.json(freteGratis);
    } catch (error) {
      console.error('Erro ao buscar o frete grátis:', error);
      res.status(500).json({ message: 'Erro ao buscar o frete grátis' });
    }
  },

  async calcularFrete(req, res) {
    try {
      // Obtém o valor total do carrinho de compras dos cookies
      const valorCarrinho = parseFloat(req.body.total);
      
      console.log(valorCarrinho);

      if (isNaN(valorCarrinho)) {
        return res.status(400).json({ message: 'Valor do carrinho inválido' });
      }

      // Calcula o valor do frete com base no valor do carrinho
      const valorFrete = await freteService.calcularFrete(valorCarrinho);
      
      res.json({ valorFrete });
    } catch (error) {
      console.error('Erro ao calcular o frete:', error);
      res.status(500).json({ message: 'Erro ao calcular o frete' });
    }
  }
};

module.exports = freteController;
