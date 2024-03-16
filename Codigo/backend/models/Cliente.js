const { Model, DataTypes } = require('sequelize');
const Database = require('./Database');
const Usuario = require('./Usuario');
const Endereco = require('./Endereco');

const sequelize = new Database(); // Cria uma nova instância de Database


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
    telefone: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: false
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
    sequelize: sequelize.getInstance(),
    modelName: 'Cliente',
    tableName: 'tb_cliente',
    timestamps: false
  }
);

module.exports = Cliente;