const { mongoose }  = require('./../db/mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
console.log('inside user');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate:{
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: `{VALUE} is not  valis email`
        } 
    },
    password: {
        type: String,
        required: true,
        minlength: 6,

    },
    token: [
        {
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }
    ]
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateTokens = function() {
    var user = this ;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'secret123').toString();

     user.token.push({access, token});
    return user.save().then(() =>  token);
}

var User = mongoose.model('User', UserSchema);

module.exports = {
    User
}