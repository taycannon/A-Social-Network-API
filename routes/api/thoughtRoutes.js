const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');

// /api/thought
router.route('/').get(getThoughts).post(createThought);

// /api/thought/:ThoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);
//create thought
router.route('/:thoughtId/reactions').post(addReaction)
//delete thought
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router;
