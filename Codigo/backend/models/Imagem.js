const { Model, DataTypes } = require('sequelize');
const Database = require('./Database');

const sequelize = new Database(); // Cria uma nova instância de Database

class Imagem extends Model {}

Imagem.init(
  {
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    caminho: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },
  {
    sequelize: sequelize.getInstance(),
    modelName: 'Imagem',
    tableName: 'tb_imagem',
    timestamps: false
  }
);

module.exports = Imagem;