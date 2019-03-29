const token = require('jsonwebtoken')
const User = require('../models/user')
const Question = require('../models/question')
const Answer = require('../models/answer')
require('dotenv').config()
const secret = process.env.tokenlogin

module.exports = {
    tokencheck: function (req, res, next) {
        if (!req.headers.token) {
            res.status(401).json({ msg: `please provide jwt token` })
        } else {
            token.verify(req.headers.token, secret, function (err, decoded) {
                if (err) {
                    console.log(err);
                    res.status(401).json({ msg: `jwt malformed`, err: err })
                } else {
                    User.findById(decoded)
                    .then(data=>{
                        if (data) {
                            res.locals.user = data
                            next()
                        } else {
                            throw new Error ('user not found')
                        }
                    })
                    .catch(err=>{
                        res.status(500).json(err.Error)
                    })
                }
            })
        }
    },
    checkOwnerQuestions: function(req,res, next) {
        Question.findOne({
            _id:req.body.id
        })
        .then(data=>{
            if (data.user_id === res.locals.user._id) {
                next()
            } else {
                res.status(401).json({
                    message:'forbidden authorization'
                })
            }
        })
    },
    checkOwnerAnswer: function(req,res, next) {
        Answer.findOne({
            _id:req.body.id
        })
        .then(data=>{
            if (data.user_id === res.locals.user._id) {
                next()
            } else {
                res.status(401).json({
                    message:'forbidden authorization'
                })
            }
        })
    }
};
