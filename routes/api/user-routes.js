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
    .route('/:id')
    .get(getUserByID)
    .put(updateUser)
    .delete(deleteUser)

router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)


module.exports = router;