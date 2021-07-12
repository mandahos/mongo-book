const router = require('express').Router();

const {
    getAllUser,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controllers');

router
    .route('/')
    .get(getAllUser)
    .post(createUser);

router
    .route('/:id')
    .get(getUserByID)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;