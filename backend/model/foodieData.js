const {DataTypes} = require('sequelize');
const sqlconn = require('../config/sqldb');

const foodieData = sqlconn.define('foodiedata',{
    
    id: {
        type: DataTypes.STRING,
        notEmpty: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        notEmpty: true
    },
    phoneNo: {
        type: DataTypes.BIGINT,
        notEmpty: true
    },
    mailId: {
        type: DataTypes.STRING,
        notEmpty: true
    },
    password: {
        type: DataTypes.STRING,
        notEmpty: true
    }
    
})

module.exports = foodieData