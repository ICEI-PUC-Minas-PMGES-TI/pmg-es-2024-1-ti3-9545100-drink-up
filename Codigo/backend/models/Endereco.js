const { Model, DataTypes } = require('sequelize');
const Database = require('./Database');

const sequelize = new Database(); // Cria uma nova instância de Database


class Endereco extends Model {}

Endereco.init(
  {
    rua: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bairro: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    complemento: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    uf: {
      type: DataTypes.CHAR(2),
      allowNull: false
    },
    cep: {
      type: DataTypes.STRING(8),
      allowNull: false
    }
  },
  {
    sequelize: sequelize.getInstance(),
    modelName: 'Endereco',
    tableName: 'tb_endereco',
    timestamps: false
  }
);

module.exports = Endereco;
