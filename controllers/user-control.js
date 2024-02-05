let { User } = require("../models");

let userControl = {

    //All the users
    getUsers(req, res) {
      User.find({})
        .sort({ _id: -1 })

        .then((dbData) => res.json(dbData))
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },

  //Getting the user through his/her ID
    getUserThroughId({ params }, res) {
      User.findOne({ _id: params.userID })
        .select("-__v")
        .populate({
          path: "thoughts",
        })
        .populate({
          path: "friends",
        })
        .then((dbData) => {
          if (!dbData) {
            res.status(404).json({ message: "There is no user who has this ID. Sorry!" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    },

  //Create a new user
  createUser({ body }, res) {
    User.create(body)
      .then((dbData) => res.json(dbData))
      .catch((error) => res.status(400).json(error));
  },

  //Update user through its ID
  updateUserThroughID({body, params }, res) {
    User.findOneAndUpdate({ _id: params.userID }, body, {
      runValidators: true,
      new: true      
    })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "There is no user with this ID. Sorry!" });
          return;
        }
        res.json(dbData);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  },

  //Deleting user through ID
  deleteUserThroughID({ params }, res) {
    User.findOneAndDelete({ _id: params.userID })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "There is no user with this ID. Sorry!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  //   POST to add new friend to user's friend list
  addFriend({ body, params }, res) {
    User.findOneAndUpdate(
      { _id: params.userID },
      {runValidators: true, new: true},
      { $push: { friends: params.friendID } }
    )
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "There is no user with this ID. Sorry!" });
          return;
        }
        res.json(dbData);
      })
      .catch((error) => res.json(error));
  },
  
  //Deleting a Friend
  deleteFriend({ params }, res) {
    console.log("remove friend", params.friendId);
    User.findOneAndUpdate(
      { $pull: { friends: params.friendId } },
      { new: true },
      { _id: params.UserID }
  
    )
      .then((dbData) => res.json(dbData))
      .catch((error) => res.json(error));
  },
};

module.exports = userControl;
