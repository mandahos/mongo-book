const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'You are required to have a Username.',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: 'You have to use an email to sign up',
        validate: {
         validator(validEmail) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                validEmail
            );
    },
    message: 'Please enter a valid Email',
}
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        }, 
        id: false
    }
);

//create User model using the UserSchema
const User = model('User', UserSchema);

//get the total count of friends
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

//exports
module.exports = User;