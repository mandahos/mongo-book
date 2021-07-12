const router = require('express').Router();
const { addThought, removeThought } = require('../../controllers/thought-controllers');

router.route('/:userId').post(addThought);

router.route('/:userID/:thoughtId').delete(removeThought);

module.exports = router;