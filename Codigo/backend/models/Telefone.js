const { Model, DataTypes } = require('sequelize');
const Database = require('../Database');

class Telefone extends Model {}

Telefone.init(
  {
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    telefone_adicional: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  },
  {
    sequelize: Database.sequelize,
    modelName: 'Telefone',
    tableName: 'tb_telefone',
    timestamps: false
  }
);

module.exports = Telefone;