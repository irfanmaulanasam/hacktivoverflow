const { Question, User} = require('../models'), check = require('../helpers/token')

class QuestionController{
    static create(req,res){
        console.log(res.locals.user, 'ini yang dicari')
        // console.log(req.body)
        let newData = {}
            newData.user_id = res.locals.user._id
            console.log(data.id)
        if(req.body){
            if (req.body.title) {
            newData.title = req.body.title 
            } 
            if(req.body.description){
                newData.description = req.body.description
            }
        } else {
            throw Error('Title/description not define')
        }
        Question.create(newData)
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
        
        Question.findById(req.params.id)
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
        // console.log(req.params,'ini id dari req params update ')
        // console.log(res.locals.user,'ini user profile')
        let user = res.locals.user
        Question.findById(req.params.id)
        .then(data=>{
            console.log(data,'ini data question')
          if(data){
              if (String(data.user_id) === String(user._id)) {
                  if (req.body.title) {
                      data.title = req.body.title
                  }
                  if(req.body.description){
                      data.description = req.body.description
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
        .then(data=>{
            res.status(200).json(data)
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
        let user = res.locals.user
        Question.findById(req.params.id)
        .then(data=>{
            console.log(user, data,String(data.user_id )=== String(user._id))
            if (String(data.user_id )=== String(user._id)) {
                    data.active = false
                    console.log(data)
                    return data.save()
            } else {
                throw Error('not authorized')
            }
        })
        .then(data=>{
            res.status(200).json(data)
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
        const status = Boolean(req.body.status)
        let voter = res.locals.user
        let newVote = {}
            newVote.id = voter._id
            newVote.status = status
        Question.findById(req.params.id)
        .then(data=>{
            data.vote.forEach((element, index) => {
                if (element.id === newVote.id && element.status === newVote.status) {
                    data.vote.slice(index,1)
                } 
                if (element.id === newVote.id && element.status !== newVote.status) {
                    data.vote[index].status = newVote.status
                } 
                if (element.id !== newVote.id && element.status !== newVote.status && index >data.vote.length) {
                    data.vote.push(newVote)
                }
                if (data.vote.status === status ) {
                    data.totalvote ++
                } else {
                    data.totalvote --
                }
            })
            return data.save()
        })
        .then(data=>{
            console.log(data)
            res.status(200).json(data)
        })
        .catch(err=>{
            console.error()
            res.status(500).json({
                message: 'internal server error',
                error: err.Error
            })
        })
    }
}

module.exports = QuestionController