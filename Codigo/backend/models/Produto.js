const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Produto extends Model {}

  Produto.init({
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    id_imagem: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tb_imagem', // Nome da tabela no banco de dados, ajustado para corresponder ao esquema
        key: 'id'
      }
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tb_categoria', // Nome da tabela no banco de dados, ajustado para corresponder ao esquema
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Produto',
    tableName: 'tb_produto',
    timestamps: false
  });

  return Produto;
};
