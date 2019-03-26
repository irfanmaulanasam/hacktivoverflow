const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    question_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
    },
    answer:{
        type:String,
        required:[true,'answer cant be empty value']
    },
    status:{
        type:Boolean,
        default:false
    }
})

answerSchema.plugin(timestamp,  {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
let answer = mongoose.model('Answers',answerSchema)

module.exports = answer