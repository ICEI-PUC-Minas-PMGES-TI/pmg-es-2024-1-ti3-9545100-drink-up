const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const Database = require('./Database');

const sequelize = new Database(); // Cria uma nova instância de Database

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
    },
    perfil: {
      type: DataTypes.ENUM('admin', 'cliente'),
      allowNull: false
    }
  },
  {
    sequelize: sequelize.getInstance(),
    modelName: 'Usuario',
    tableName: 'tb_usuario',
    timestamps: false,
    hooks: {
      beforeCreate: async (usuario) => {
        const salt = await bcrypt.genSalt(10);
        usuario.senha = await bcrypt.hash(usuario.senha, salt);
      },
      beforeUpdate: async (usuario) => {
        if (usuario.changed('senha')) {
          const salt = await bcrypt.genSalt(10);
          usuario.senha = await bcrypt.hash(usuario.senha, salt);
        }
      }
    }
  }
);

module.exports = Usuario;
