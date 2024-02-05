let { User, Thought } = require("../models");

let thoughtControl = {
  // Getting every single thought
  getThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "thoughts",
      })
      .sort({ _id: -1 })
      .then((dbData) => res.json(dbData))
      .catch((error) => {
        res.status(400).json(error);
      });
  },

  //Getting a thought through its ID
  getThoughtThroughID({ params }, res) {
    Thought.findOne({ _id: params.thoughtID })
      .populate({
        path: "thoughts",
      })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "Thre is no thought that has this ID. Sorry!" });
          return;
        }
        res.json(dbData);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  },

  //How To: Create A New Thought
  newThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        console.log(_id);
        return User.findOneAndUpdate(
          { new: true },
          { $push: { thoughts: _id } },
          { _id: body.userId },
        );
      })
      .then((dbData) => {
        console.log(dbData);
        if (!dbData) {
          res.status(404).json({ message: "There is no user that has this ID. Sorry!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => res.json(err));
  },

  //Updating thought through its ID
  updateThoughtThroughID({ body, params}, res) {
    console.log(params.thoughtID);
    console.log(body);
    Thought.findOneAndUpdate({ _id: params.thoughtID }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "There is no thought that has this ID. Sorry!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // DELETE to remove thought by _id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtID })
      .then((noThought) => {
        if (!noThought) {
          return res.status(404).json({ message: "There is no thought that has this ID. Sorry!" });
        }
        console.log(noThought);
        User.findOneAndUpdate(
          { username: noThought.username },
          { $pull: { thoughts: params.thoughtID } },
          { new: true }
        ).then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
          }
          res.json(dbUserData);
        });
      })
      .catch((error) => res.json(error));
  },
  //How To: Create A Reaction
  newReaction({ body, params }, res) {
    Thought.findOneAndUpdate(
      { $push: { reactions: body } },
      { new: true, runValidators: true },
      { _id: params.thoughtId }
    )
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "There is no user that has this ID. Sorry!" });
          return;
        }
        res.json(dbData);
      })
      .catch((error) => res.json(error));
  },
  // Deleting every reaction through the reactionID
deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbData) => res.json(dbData))
      .catch((error) => res.json(error));
  },
};

module.exports = thoughtControl;
