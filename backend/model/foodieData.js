const {DataTypes} = require('sequelize');
const sqlconn = require('../config/sqldb');

const foodieData = sqlconn.define('foodiedata',{
    
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