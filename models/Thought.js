const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId(),
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: 'Please enter a reaction.',
        maxlength: 280
    },
    username: {
        type: String,
        required: 'Please enter your username.'
    },
    createdAt: {
        type: Data,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
    {
        toJSON: {
            getters: true
        }
    }
);    

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'Please enter your thoughts!',
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    reactions: [ReactionSchema]
},
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

const Thought = model('Thought', ThoughtSchema);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

module.exports = Thought;