const { Thought, User } = require('../models');

const thoughtController = {
    
    //all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select("-__v")
            .sort({ _id: -1 })
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    getThoughtById({ params }, res) {
        console.log("params sent", params)
        Thought.findOne({ _id: params.thoughtId })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'Try again, no thought with this ID.'});
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
    },

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
                res.status(404).json ({ message: 'Try again, no user with this ID.' });
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
                return res.status(404).json({ message: 'Try again, no thought with this ID.' });
            }
            return User.findOneandUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'Try again, no thought with this ID.' });
                return;
            }
            res.json(dbUserData);
        })
        .cath(err => res.json(err));
    },

    //add reaction
    addReaction({ params, body}, res) {
        Thought.findOneandUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Try again, no user with this ID.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },    
   
    //remove reaction
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