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
    .post(addThought)
    

router
    .route('/:thoughtId')
    .get(getThoughtById)
    // .put(updateThought)
    .delete(removeThought)

router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(addThought)
    .delete(removeThought)

router
    .route('/:thoughtId/reaction')
    .post(addReaction)
    .delete(removeReaction)

router
    .route('/:thoughtId/reaction/:reactionId')
    .delete(removeReaction)

module.exports = router;