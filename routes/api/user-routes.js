const router = require("express").Router();

const {
    getUsers, getUserThroughId, createUser, updateUserThroughID, deleteUserThroughID, addFriend, deleteFriend
} = require("../../controllers/user-control");

router.route("/").get(getUsers).post(createUser);

router.route("/:userId").get(getUserThroughId).put(updateUserThroughID).delete(deleteUserThroughID);

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);


module.exports = router;