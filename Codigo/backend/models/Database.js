const Sequelize = require("sequelize");

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
      } catch (error) {
        console.error('Erro ao conectar com o banco de dados:', error);
      }
    }

    getInstance() {
      return this.sequelize;
    }
}

module.exports = Database;