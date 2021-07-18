const { User, Thought, Types } = require('../models');

const userController = {
    //get all users
    getAllUser(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //get one User by ID
    getUserByID({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Try again, no user with this ID.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //create user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err))
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body, {new: true, runValidators: true })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Try again, no user with this ID.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(400).json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Try again, no user with this ID.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    addFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendId } },
            { new: true }
        )
            .select("-__v")
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Try again, no user with this ID.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },
    removeFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .select("-__v")
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Try again, no user with this ID.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(400).json(err));
    },
}

module.exports = userController