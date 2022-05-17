const {DataTypes} = require('sequelize');
const sqlconn = require('../config/sqldb');

const adminData = sqlconn.define('adminData',{
    
    mailId: {
        type: DataTypes.STRING,
        notEmpty: true
    },
    password: {
        type: DataTypes.STRING,
        notEmpty: true
    }
    
})

module.exports = adminData