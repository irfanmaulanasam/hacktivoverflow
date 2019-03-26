const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:[true,'title/desciption not defined']
    },
    question:{
        type:String,
        required:[true,'question cant have empty value']
    },
    status:{
        type:Boolean,
        default:false
    },
    active:{
        type:Boolean,
        default:true
    }
})
    
questionSchema.plugin(timestamp,  {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })

  let question = mongoose.model('questions', questionSchema)
 
module.exports = question