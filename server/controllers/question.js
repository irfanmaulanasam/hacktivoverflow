const {Answer,Question,User,Vote} = require('../models'), check = require('../helpers/token')

class QuestionController{
    static create(req,res){
        let newData = {}
        check.verify(req.headers.token)
        .then(data=>{
            newData.user_id = data
            return User.findbyId(data)
        })
        .then(data=>{
            if(data){
                if(req.body){
                    if (req.body.title) {
                       newData.title = req.body.title 
                    } 
                    if(req.body.question){
                        newData.question = req.body.question
                    } 
                    return newData.save()
                } else {
                    throw Error('Title/description not define')
                }
            } else {
                throw Error('User not found')
            }
        })
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            if(err.code === 11000){
                res.status(204).json(err.Error)
            } else if(err.message){
                res.status(203).json(err.message)
            } else {
                res.status(500).json({
                    message:'internal server error'
                })
            }
        })
    }

    static read(req,res){
        let where = {}
        if(req.params.id){
            where.id = req.params.id
        }
        Question.findbyId(where)
        .then(data=>{
            if (data) {
                res.status(200).json(data)
            } else {
                throw Error('not found')
            }
        })
        .catch(err=>{
            console.error();
            
            if (err.message) {
                res.status(404).json(err.message)
            } else {
                res.status(500).json({
                    message:'internal server error'
                })
            }
        })
    }

    static update(req,res){
        check.verify(req.headers.token)
        let id = null
        .then(data=>{
            return User.findbyId(data)
        })
        .then(data=>{
            id = data
            return Question.findbyId(req.body.id)
        })
        .then(data=>{
          if(data){
              if (data.user_id === id) {
                  if (req.body.title) {
                      data.title = req.body.title
                  }
                  if(req.body.question){
                      data.question = req.body.question
                  }
                  if (req.body.status) {
                      data.status = true
                  }
                  return data.save()
              } else {
                  throw Error('not authorized')
              }
          } else {
              throw Error('not found')
          }
        })
        .catch(err=>{
            if(err.message){
                if (err.message == 'not found') {
                    res.status(404).json({
                        message: 'data not found'
                    })
                } else {
                    res.status(401).json(err.message)
                }
            } else {
                res.status(500).json({
                    message:'internal server error'
                })
            }
        })
    }

    static archive(req,res){
        check.verify(req.headers.token)
        let id = null
        .then(data=>{
            return User.findbyId(data)
        })
        .then(data=>{
            id = data
            return Question.findbyId(req.body.id)
        })
        .then(data=>{
          if(data){
              if (data.user_id === id) {
                      data.active = false
                      return data.save()
              } else {
                  throw Error('not authorized')
              }
          } else {
              throw Error('not found')
          }
        })
        .catch(err=>{
            if(err.message){
                if (err.message == 'not found') {
                    res.status(404).json({
                        message: 'data not found'
                    })
                } else {
                    res.status(401).json(err.message)
                }
            } else {
                res.status(500).json({
                    message:'internal server error'
                })
            }
        })   
    }
}

module.exports = QuestionController