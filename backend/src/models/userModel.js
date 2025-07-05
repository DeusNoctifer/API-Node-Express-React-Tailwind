const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelizeConfig');
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    celphone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'users',
    timestamps: false,
});
module.exports = User;