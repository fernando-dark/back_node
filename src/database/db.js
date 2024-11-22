const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    const sslCertPath = path.join(__dirname, 'certs', 'global-bundle.pem');

    // Configuración de la conexión usando Sequelize
    this.sequelize = new Sequelize({
      dialect: 'postgres',
      host: "database-liverpool.cz0es6muycoi.us-east-2.rds.amazonaws.com",
      database: "liverpool",
      username: "postgresliver",
      password: "_j7%L%r078a5",
      port: 5432,
      ssl: { rejectUnauthorized: false },
    });

    Database.instance = this;
  }

  // Método para hacer consultas a la base de datos
  async query(sql, values) {
    try {
      const [results, metadata] = await this.sequelize.query(sql, {
        replacements: values,
      });
      return results;
    } catch (err) {
      console.error('Database query error:', err);
      throw err;
    }
  }

  // Método para cerrar la conexión
  async close() {
    try {
      await this.sequelize.close();
    } catch (err) {
      console.error('Error closing connection:', err);
    }
  }
}

// Export the sequelize instance, not the Database class
module.exports = new Database().sequelize;
