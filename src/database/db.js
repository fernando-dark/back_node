const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    const sslCertPath = path.join(__dirname, 'us-east-2-bundle.pem');

    // Leer el archivo del certificado
    const caCert = fs.readFileSync(sslCertPath);

    // const sslCertPath = path.join(__dirname, 'certs', 'us-east-2-bundle.pem');

    // Configuración de la conexión usando Sequelize
    this.sequelize = new Sequelize({
      dialect: 'postgres',
      host: "database-liverpool.cz0es6muycoi.us-east-2.rds.amazonaws.com",
      database: "bgliverpool",
      username: "postgresliver",
      password: "_j7%L%r078a5",
      port: 5432,
      dialectOptions: {
        ssl: {
          ca: caCert,
          require: true,
          rejectUnauthorized: true, // Solo si no tienes certificado válido
        }
      }
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
