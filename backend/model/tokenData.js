const {DataTypes} = require('sequelize');
const sqlconn = require('../config/sqldb')

const tokenData = sqlconn.define('tokenData',{
    
    refreshToken: {
        type: DataTypes.STRING,
        notEmpty : true
    },

});
module.exports = tokenData