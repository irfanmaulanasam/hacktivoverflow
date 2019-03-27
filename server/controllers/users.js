const {Answer,Question,User,Vote} = require('../models')
const password = require('../helpers/password')
const token = require('../helpers/token')
require('dotenv').config()

class UserController{

    static create(req,res){
        let newUser = req.body
        let dataSuccess = {}

        User.create(newUser)
        .then(data=>{
            dataSuccess = {
                email:data.email,
                username:data.username,
                password: data.password,
                job: data.job,
                token:null
            }
            return token.create(data.id)
        })
        .then(data=>{
            dataSuccess.token = data
            res.status(201).json(dataSuccess)
        })
        .catch(err=>{
            if(err.Error === 'invalid address'){
                res.status(404).json({
                    message:'page not found'
                })
            } else if(err.code === 11000){
                res.status(400).json({
                    message:'email/username already exist'
                })
            } else if(err.message){
                let message = err.message.split(':').slice(1)
                res.status(400).json({
                    message: message
                })
            } else {
                console.log(`masuk sini sekarang`)
                res.status(500).json({
                    error:err.message,
                    message:'internal server error'
                })
            }
        })
    }

    static read(req,res){
        let where= {}
        if(req.params){
            where = {
                id : req.params.id
            }
        }
        User.find(where)
        .then(data=>{
            console.log(data)
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json({
                message:'internal server error',
                error: err.Error
            })
        })
    }
    static signin(req,res){
        let id = null
        let dataSuccess = {}
        User.findOne({$or:[
            {email:req.body.email},
            {username:req.body.email}    
        ]})
        .then(data=>{
            if (!data) {
                throw new Error ({
                    message:'username/password is invalid'
                })
            } else {
                id = data.id
                return password.compare(req.body.password,data.password)
            }
        })
        .then(check=>{
            if (check) {
                return token.create(id)
            } else {
                throw new Error ({
                    message: 'username/password is invalid'
                })
            }
        })
        .then(data=>{
            dataSuccess.id = id
            dataSuccess.token = data
            res.status(200).json(dataSuccess)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static update(req,res){
        // console.log(res.locals.user,'ini res local')
        // console.log('========')
        // console.log(req.body, 'ini req.body')
        // console.log(req.params,'ini req params')
        // console.log(req.headers, 'ini req headers')
        // console.log('===========')
        const {username,password,job} = req.body
        const id = res.locals.user._id
        User.findById(id)
        .then(user=>{
            if (user) {
                if (name) {
                    user.name = name
                }
                if(username){
                    user.username = username
                }
                if (password) {
                    user.password = password
                }
                if (address) {
                    user.job = job
                }
                return user.save()
            } else {
                throw new Error({
                    message:'user not found'
                })
            }
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err.Error)
        })
    }

    static out(req,res){
        token.verify(req.header.token)
        then(id=>{
            return User.findById(id)
        })
        .then(data=>{
            data.status = false
            return data.save()
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err.Error)
        })
    }

    static removeuser(req,res){
        // console.log(res.locals.user,'data pertama')
        User.findById(res.locals.user._id)
        .then(data=>{
            console.log( 'data kedua',data)
            data.status = false
            return data.save()
        })
        .then(data=>{
            console.log( 'ini yang ketiga' , data)
            res.status(200).json(data)
        })
        .catch(err=>{
            console.error()
            res.status(500).json(err.Error)
        })
    }
}

module.exports = UserController