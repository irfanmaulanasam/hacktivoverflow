// | routes | method | headers | body | description | output |
// | ----- |-|:----:|--------|-----| :---------- |
// | ```/question``` | **GET** | **NONE** | **NONE** | get all question in website | ```[{title:string, description:string},{title:string, description:string},{title:string, description:string}]``` |
// | ```/question/:id``` | **GET** | **NONE** | **NONE** | get question by id in website | ```title:string, description:string, answer:[]``` |
// | ```/question/add``` | **POST** | **TOKEN** | title:string, description:string | add question in website by user | ```title:string, description:string``` |
// | ```/question/update/:id``` | **PUT** | **TOKEN** | title:string, description:string | update user question in website | ```title:string, description:string``` |
// | ```/question/archive``` | **PUT** | **TOKEN** | question_id:string | archiving user question in website | ```message:string``` |
// | ```/question/delete``` | **DELETE** | **TOKEN** | question_id:string | delete user question in website | ```message:string``` |
// | ```/question/upvote/:id``` | **PUT** | **TOKEN** | answer_id | update vote for question in website | ```vote:number``` |
// | ```/question/downvote/:id``` | **PUT** | **TOKEN** | answer_id | update vote  for question in website | ```vote:number``` |

const express = require('express'), router = express.Router(), {QuestionController, VoteController} = require('../controllers'),tokencheck = require('../middleware/')

router.get('/', QuestionController.read)
router.get('/:id',QuestionController.read)
router.post('/add', tokencheck, QuestionController.create)
router.put('/update/:id',tokencheck,QuestionController.update)
router.put('/archive/:id', tokencheck, QuestionController.archive)
router.put('/upvote/:id', tokencheck, VoteController.create)
router.put('/downvote/:id', tokencheck, VoteController.create)