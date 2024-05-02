const { Model, DataTypes } = require('sequelize');
const Database = require('./Database');


const sequelize = new Database(); 


class Frete extends Model {}

Frete.init(
  {
    frete_fixo: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
      defaultValue: 0.00
    },
    frete_gratis: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
      defaultValue: 0.00
    }
  },
  {
    sequelize: sequelize.getInstance(),
    modelName: 'Frete',
    tableName: 'tb_frete',
    timestamps: false
  }
);

module.exports = Frete;