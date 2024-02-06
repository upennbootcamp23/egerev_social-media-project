const router = require("express").Router();

const { getThoughts, getThoughtThroughID, newThought, updateThoughtThroughID, deleteThought, newReaction, deleteReaction } = require("../../controllers/thought-control");

router.route("/").get(getThoughts).post(newThought);

router.route("/:thoughtId").get(getThoughtThroughID).put(updateThoughtThroughID).delete(deleteThought);

router.route("/:thoughtId/reactions").post(newReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;