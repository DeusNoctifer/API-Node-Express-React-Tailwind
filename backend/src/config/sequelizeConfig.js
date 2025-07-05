const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
    }
);

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos MySQL con Sequelize establecida correctamente.');
    } catch (error) {
        console.error('Error al conectar a la base de datos con Sequelize:', error);
        process.exit(1);
    }
}
module.exports = { sequelize, connectDB };