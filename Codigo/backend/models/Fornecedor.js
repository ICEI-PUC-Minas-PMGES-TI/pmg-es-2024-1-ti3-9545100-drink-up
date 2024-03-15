const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Fornecedor extends Model {}

  Fornecedor.init({
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    identificador: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    id_telefone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'telefones', // Certifique-se de usar o nome da tabela aqui
        key: 'id'
      }
    },
    id_endereco: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'enderecos', // Certifique-se de usar o nome da tabela aqui
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Fornecedor',
    tableName: 'tb_fornecedor',
    timestamps: false
  });

  return Fornecedor;
};
