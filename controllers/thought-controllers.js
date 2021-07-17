const { Thought, User } = require('../models');

const thoughtController = {
    //add thought
    addThought ({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneandUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json ({ message: 'Invalid ID, please enter a valid User ID.'});
                return;
            }
            res.json(dbUserData);
        })
        .cath(err => res.json(err));
    },

    addReaction({ params, body}, res) {
        Thought.findOneandUpdate(
            { _id: params.thoughtId },
            { $push: { replies: body } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Sorry no comment found' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    
    //remove thought

    removeThought({ params}, res) {
        Thought.findOneandDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No Thought found, please enter a valid ID.'});
            }
            return User.findOneandUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User found with this ID' });
                return;
            }
            res.json(dbUserData);
        })
        .cath(err => res.json(err));
    },

    removeReaction({ params }, res){
        Thought.findOneAndDelete(
            { _id: params.thoughtId },
            { $pull: {reactions: {reactionID: params.reactionID } } },
            {new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;