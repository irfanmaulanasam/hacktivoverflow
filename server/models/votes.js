const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const voteSchema = new Schema({
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    answer_id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    question_id:{
        type:mongoose.Schema.Types.ObjectId
    },
    status:{
        type:String,
        required:[true,'status cannot have empty value']
    }
})

voteSchema.plugin(timestamp,  {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
let vote = mongoose.model('Answers',voteSchema)

module.exports = vote