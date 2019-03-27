const express = require('express'), router = express.Router(), QuestionController = require('../controllers/question'),{tokencheck} = require('../middleware/')

router.get('/', QuestionController.read)
router.get('/:id',QuestionController.read)
router.post('/add', tokencheck, QuestionController.create)
router.put('/update/:id',tokencheck,QuestionController.update)
router.put('/archive/:id', tokencheck, QuestionController.archive)
router.patch('/vote/:id', tokencheck, QuestionController.vote)

module.exports = router