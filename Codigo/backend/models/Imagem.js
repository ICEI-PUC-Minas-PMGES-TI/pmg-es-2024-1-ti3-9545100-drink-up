const { Model, DataTypes } = require('sequelize');
const Database = require('./Database');

class Imagem extends Model {}

Imagem.init(
  {
    caminho: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },
  {
    sequelize: Database.sequelize,
    modelName: 'Imagem',
    tableName: 'tb_imagem',
    timestamps: false
  }
);

module.exports = Imagem;