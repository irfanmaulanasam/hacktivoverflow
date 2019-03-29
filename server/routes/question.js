const express = require('express'), router = express.Router(), QuestionController = require('../controllers/question'),{tokencheck, checkOwnerQuestions} = require('../middleware/')

router.get('/', QuestionController.read)
router.get('/:id',QuestionController.read)
router.post('/add', tokencheck, QuestionController.create)
router.put('/update/:id',tokencheck, checkOwnerQuestions, QuestionController.update)
router.put('/archive/:id', tokencheck, checkOwnerQuestions, QuestionController.archive)
router.patch('/vote/:id', tokencheck, checkOwnerQuestions, QuestionController.vote)

module.exports = router