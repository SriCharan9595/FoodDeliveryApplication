const jwt = require('jsonwebtoken')
require('dotenv').config();

authToken = userFound => {
    return jwt.sign({
        iss:'sricharan',
        sub:userFound.id,
        iat:Math.floor(Date.now()/1000),
    },
    process.env.secret,{
        expiresIn:'5m'
    });
}

refreshToken = userFound => {
    return jwt.sign({
        iss:'sricharan',
        sub:userFound.id,
        iat:Math.floor(Date.now()/1000),
    },
    process.env.secret,{
        expiresIn:'60m'
    });
}

module.exports = {
    authToken,
    refreshToken
}