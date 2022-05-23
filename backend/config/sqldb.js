const Sequelize = require ('sequelize');
require('dotenv').config()


const sqlconn = new Sequelize('foodiezspot','root',process.env.sqlPswdLocal,
{
    dialect: 'mysql',
    host: 'localhost',
    define:{
        timestamps: false,
        freezeTableName: true
    }
});

module.exports = sqlconn;