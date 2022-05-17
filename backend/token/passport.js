const { authenticate } = require('passport');
var JWTStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var authBody = {}
const passport = require('passport')
const foodieData = require('../model/foodieData')
require('dotenv').config();

authBody.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
authBody.secretOrKey = process.env.secret;

passport.use('authToken', new JWTStrategy(authBody,async(jwtPayload,done) => {
    
    return await foodieData.findOne({where:{id:jwtPayload.sub}})
        .then( foodieData=>{
            return done(null,jwtPayload);
        })
        .catch(err=>{
            return done(err);
        });
    }
))

passport.use('refreshToken', new JWTStrategy(authBody, async(jwtPayload,done)=> {

    return await foodieData.findOne({where:{id:jwtPayload.sub}})
        .then(foodieData=>{
            return done(null,jwtPayload);
        })
        .catch(err=>{
            return done(err);
        });
    }
))


module.exports = passport
    