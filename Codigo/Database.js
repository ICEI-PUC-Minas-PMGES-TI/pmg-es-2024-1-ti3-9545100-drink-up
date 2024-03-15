const { Sequelize } = require('sequelize');

class Database {
  constructor() {
    this.sequelize = new Sequelize({
      database: 'drink_up',
      username: 'drinkup_master',
      password: 'drinkup',
      host: 'localhost',
      dialect: 'mysql',
    });
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log('Conexão com o banco de dados estabelecida com sucesso.');
      await this.sequelize.sync();
      console.log('Modelos sincronizados com sucesso.');
    } catch (error) {
      console.error('Erro ao conectar com o banco de dados:', error);
    }
  }
}

module.exports = new Database();
