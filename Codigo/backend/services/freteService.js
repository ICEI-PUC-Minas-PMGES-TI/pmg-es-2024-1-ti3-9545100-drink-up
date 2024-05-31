const Frete = require('../models/Frete');

async function calcularFrete(valorCarrinho) {
    try {

        id = 1;
        const frete = await Frete.findByPk(id);

        if (!frete) {
            throw new Error('Configurações de frete não encontradas');
        }

        let valorFrete = frete.frete_fixo;

        if (valorCarrinho >= frete.frete_gratis) {
            valorFrete = 0;
        }

        // Retorna o valor calculado do frete
        return valorFrete;
    } catch (error) {
        console.error('Erro ao calcular o frete:', error);
        throw new Error('Erro ao calcular o frete');
    }
}

async function listarFretes() {
    try {
        // Retorna todas as configurações de frete da tabela
        const frete = await Frete.findByPk(1);
        return frete;
    } catch (error) {
        console.error('Erro ao listar fretes:', error);
        throw new Error('Erro ao listar fretes');
    }
}

async function atualizarFrete(frete_fixo, frete_gratis) {
    try {
    Frete.findByPk(1) // Substitua idDoRegistro pelo ID do registro que deseja atualizar
  .then(registroEncontrado => {
    if (registroEncontrado) {
      // Atualize os valores do registro encontrado
      registroEncontrado.update({
        frete_fixo: frete_fixo,
        frete_gratis: frete_gratis,
      })
      .then(registroAtualizado => {
        console.log('Registro atualizado:', registroAtualizado.toJSON());
      })
      .catch(error => {
        console.error('Erro ao atualizar registro:', error);
      });
    } else {
      console.log('Registro não encontrado.');
    }
  })
  .catch(error => {
    console.error('Erro ao encontrar registro:', error);
  });
    
    } catch (error) {
        console.error('Erro ao atualizar o frete fixo:', error);
        throw new Error('Erro ao atualizar o frete fixo');
    }
}

// async function atualizarFreteGratis(FreteGratis) {
//     try {
//         // Atualiza o valor mínimo para frete grátis na tabela
//         await Frete.update({ frete_gratis: FreteGratis }, { where: {} });
//         return { mensagem: 'Frete grátis atualizado com sucesso' };
//     } catch (error) {
//         console.error('Erro ao atualizar o frete grátis:', error);
//         throw new Error('Erro ao atualizar o frete grátis');
//     }
// }

async function buscarFreteFixo() {
    try {
        // Busca e retorna o valor do frete fixo
        id = 1;
        const frete = await Frete.findByPk(id);
        return frete.frete_fixo;;
    } catch (error) {
        console.error('Erro ao buscar o frete fixo:', error);
        throw new Error('Erro ao buscar o frete fixo');
    }
}

async function buscarFreteGratis() {
    try {
        // Busca e retorna o valor mínimo para frete grátis
        id = 1;
        const frete = await Frete.findByPk(id);
        return frete.frete_gratis;
    } catch (error) {
        console.error('Erro ao buscar o frete grátis:', error);
        throw new Error('Erro ao buscar o frete grátis');
    }
}

module.exports = {
    calcularFrete,
    listarFretes,
    // atualizarFreteFixo,
   //  atualizarFreteGratis,
    atualizarFrete,
    buscarFreteFixo,
    buscarFreteGratis
};
