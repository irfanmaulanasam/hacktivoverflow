const {Answer,Question,User} = require('../models')

class AnswerController{
    static create(req,res){
        let newData = {}
        const {question_id,title,description} = req.body
        check.verify(req.headers.token)
        .then(data=>{
            newData.user_id = data.id
            return User.findbyId(data.id)
        })
        .then(data=>{
            if(data){
                if(req.body){
                    if (req.body.title) {
                       newData.title = title 
                    } else {
                        throw new Error('title have empty value')
                    }
                    if(req.body.description){
                        newData.description = description
                    } else {
                        throw new Error('description have empty value')
                    }
                    return Question.findbyId({
                        where:{
                            question_id
                        }
                    })
                } else {
                    throw new Error('Title/description not define')
                }
            } else {
                throw new Error('invalid Unauthorized')
            }
        })
        .then(data=>{
            if (data) {
                newData.question_id = data.id
                return Answer.create(newData)
            } else {
                throw new Error('data not found')
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
        const {answer_id, title, description } = req.body
        check.verify(req.headers.token)
        let id = null
        .then(data=>{
            return User.findbyId(data.id)
        })
        .then(data=>{
            if(data){
                id = data.id
                return Answer.findOne({$and:[
                    {_id:answer_id},
                    {question_id}
                ]})
            }
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
                  throw new Error('not authorized')
              }
          } else {
              throw new Error('data not found')
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

    static vote(req,res){
        const {question_id, status} = req.body
        let newVote = {}
        let check = null
        let user_id = null
        token.verify(req.headers.id)
        .then(({id})=>{
            newVote.id = id
            newVote.status = status
            return Question.findbyId(question_id)
        })
        .then(data=>{
            if (data) {
                data.vote.forEach( e => {
                    if (status) {
                        if (e.id === user_id ) {
                            e.status = status
                            check = data.vote
                            return data.save()
                        } 
                    } else {
                        if (e.id === user_id ) {
                            e.status = status
                            check = data.vote
                            return data.save()
                        } 
                    }
                })
            } else {
                data.vote.push(newVote)
                return data.save()
            }
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json({
                message: 'internal server error',
                error: err.Error
            })
        })
    }
}

module.exports = AnswerController