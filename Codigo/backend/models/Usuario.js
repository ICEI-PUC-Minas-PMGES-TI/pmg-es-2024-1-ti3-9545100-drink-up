const { Model, DataTypes } = require('sequelize');
const Database = require('../Database');

class Usuario extends Model {}

Usuario.init(
  {
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('1', '2', '3'),
      defaultValue: '1'
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize: Database.sequelize,
    modelName: 'Usuario',
    tableName: 'tb_usuario',
    timestamps: false
  }
);

module.exports = Usuario;