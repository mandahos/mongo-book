const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controllers')

router
    .route('/')
    .get(getAllThoughts)
        

router
    .route('/:userId')
    .post(addThought)

router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(addThought)
    .delete(removeThought)

router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction)

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)

module.exports = router;