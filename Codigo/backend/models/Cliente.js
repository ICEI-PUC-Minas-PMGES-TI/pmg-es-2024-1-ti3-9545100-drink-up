const { Model, DataTypes } = require('sequelize');
const Database = require('../Database');
const Usuario = require('./Usuario');
const Telefone = require('./Telefone');
const Endereco = require('./Endereco');

class Cliente extends Model {}

Cliente.init(
  {
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: 'id'
      }
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
    modelName: 'Cliente',
    tableName: 'tb_cliente',
    timestamps: false
  }
);

module.exports = Cliente;