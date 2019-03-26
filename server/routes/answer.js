// |routes | method | headers | body | description | output |
// | ----- |--|:----:|--------|-----| :---------- |
// | ```/answer/:id``` | **GET** | **NONE** | **NONE** | get all answer question in website | ```[{username:string, answer:string}, {username:string, answer:string}, {username:string, answer:string}]``` |
// | ```/answer/add``` | **POST** | **TOKEN** | answer:string | add answer for question in website | ```{ answer_id:string, question_id:string, user_id:string, answer:string}``` |
// | ```/answer/update/:id``` | **PUT** | **TOKEN** | answer:string | update by own user_id answer for question in website | ```{answer_id:string, user_id:string, answer:string}``` |
// | ```/answer/upvote/:id``` | **PUT** | **TOKEN** | answer_id | update vote for answer  question in website | ```vote:number``` |
// | ```/answer/downvote/:id``` | **PUT** | **TOKEN** | answer_id | update vote for answer  question in website | ```vote:number``` |

const express = require('express'), router = express.Router(), {AnswerController, VoteController} = require('../controllers'),tokencheck = require('../middleware/')

router.get('/:question_id', AnswerController.read)
router.post('/add', tokencheck, AnswerController.create)
router.put('update/:id', tokencheck, AnswerController.update)
router.put('/upvote/:id', tokencheck, VoteController.create)
router.put('/downvote/:id', tokencheck, VoteController.create)