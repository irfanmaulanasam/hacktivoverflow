const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.tokenlogin

class Token{
    static create(id){
        return new Promise(function(resolve,reject){
            jwt.sign(id,secret,function(err,token) {
                if(!err){
                    resolve(token)
                } else {
                    reject(err)
                }
            });
        })
    }

    static verify(token){
        return new Promise(function (resolve,reject) {
            jwt.verify(token,secret,function(err,verified) {
                if(!err){
                    resolve(verified)
                } else {
                    reject(err)
                }
            })
        })
    }
}

module.exports = Token