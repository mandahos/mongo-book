const router = require('express').Router();

const {
    getAllUser,
    getUserByID,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controllers')

router
    .route('/')
    .get(getAllUser)
    .post(createUser)

router
    .route('/:userId')
    .get(getUserByID)
    .put(updateUser)
    .delete(deleteUser)

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)


module.exports = router;