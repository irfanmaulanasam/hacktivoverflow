const bcrypt = require('bcryptjs');

class PasswordGenerator{

    static generate(givenPassword){
        return new Promise(function(resolve,reject){
            bcrypt.genSalt(5, function(err, salt) {
                bcrypt.hash(givenPassword, salt, function(err, hash) {
                    if(!err){
                        resolve(hash)
                    } else {
                        reject(err)
                    }
                });
            });
        })
    }

    static compare(givenPassword,hash){
        return new Promise (function (resolve,reject) {
            bcrypt.compare(givenPassword,hash,function(err,res) {
                if(!err){
                    resolve(res)
                } else {
                    reject(err)
                }
            })
        })
    }
}

module.exports = PasswordGenerator