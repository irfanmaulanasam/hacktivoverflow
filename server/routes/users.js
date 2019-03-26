const express = require('express'), router = express.Router(), {UserController} = require('../controllers'),tokencheck = require('../middleware/')

// /users	GET	NONE	NONE	get all users member in hacktivoverflow	[{name: string, job: string, total_contributions: number},{name: string, job: string, total_contributions: number}, {name: string, job: string, total_contributions: number}]
router.get('/',UserController.read)

// /users/signup	POST	NONE	email:string, username:string, password: string, job: string	sign in to website	token
router.post('/signup',UserController.create)

// /users/signin	POST	NONE	username:string, password: string	sign in to website	token
router.post('/signin',UserController.signin)

// /users/:id	POST	TOKEN	username	get other users profile	{username:String, job:String, contribution:{ question: { upvote: number, downvote: number }, solve question: { upvote: number, downvote: number }}
router.get('/:id', tokencheck, UserController.read)

// /users/me	GET	TOKEN	NONE	get own users profile	{username:String, job:String, contribution:{ question: { upvote: number, downvote: number }, solve question: { upvote: number, downvote: number }, question_status: { total_answer: Array, question_title:String, question_description:string } }
router.get('/me', tokencheck, UserController.read)

// /users/me/update	PUT	TOKEN	username:string, password:string, job:string	update user profile	{username:String, job:String, contribution:{ question: { upvote:number, downvote:number }, solve question: { upvote:number, downvote:number }, question_status: { total_answer:Array, question_title:String, question_description:string } }
router.put('/me/update', tokencheck, UserController.update)

// | ```/users/me/out``` | **PUT** | **TOKEN** | **NONE** | update user profile to unactive | ```{username:String, job:String, status:false }``` |
router.put('/me/out', tokencheck, UserController.delete)

module.exports = router;
