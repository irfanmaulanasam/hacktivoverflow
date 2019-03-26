const timestamp = require('mongoose-timestamp')
const hashingpassword = require('../helpers/password')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type: String,
        unique:[true,'username already exist'],
        validate:{
            validator(username) {
                return !/\s/.test(username);
            },
            message: `username cannot have space`
        }
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: [true, 'Email already exits'],
        validate: {
            validator: function(email) {
                return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email);
            },
            message: 'Email not valid'
        } 
    },
    password: {
        minlength:8,
        maxlength:20,
        type: String,
        required: [true, 'Password required']
    },
    job:Boolean,
    status:{
        type:Boolean,
        default:true
    }
})

userSchema.pre('save', function(next) {
        var user = this;
    
        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) return next();
            hashingpassword
                .generate(user.password)
                .then(function(hash) {
                    user.password = hash
                    next()
                })
                .catch(function(err) {
                    console.error(err)
                })
    });
    
userSchema.plugin(timestamp,  {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })

  let User = mongoose.model('Users', userSchema)
 
module.exports = User