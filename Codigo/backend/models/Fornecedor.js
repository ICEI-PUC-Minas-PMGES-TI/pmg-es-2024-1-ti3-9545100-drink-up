const { Model, DataTypes } = require('sequelize');
const Database = require('./Database');
const Telefone = require('./Telefone');
const Endereco = require('./Endereco');

class Fornecedor extends Model {}

Fornecedor.init(
  {
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
        model: Telefone,
        key: 'id'
      }
    },
    id_endereco: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Endereco,
        key: 'id'
      }
    }
  },
  {
    sequelize: Database.sequelize,
    modelName: 'Fornecedor',
    tableName: 'tb_fornecedor',
    timestamps: false
  }
);

module.exports = Fornecedor;