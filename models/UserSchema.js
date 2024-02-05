const { model, Schema } = require('mongoose');
const userBlueprint = new Schema(
  {
    username: {
      required: true,
      type: String,
      trimmed: true,
      unique: true      
    },

    email: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, true],
      unique: true,
    },

    thoughts: [
      {
        ref: 'Thought',
        type: Schema.Types.ObjectId,  
      },
    ],
    friends: [
      {
        ref: 'User',
        type: Schema.Types.ObjectId, 
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
userBlueprint.virtual('friendCount').get(function () {
  return this.friends.length;
});

// BONUS
userBlueprint.pre("findOneAndDelete", { query: true, document: false }, async function() {
    console.log("Pre-Deleting User");
    const docs = await this.model.findOne(this.getFilter());
    console.log(docs.username);
    await Thought.deleteMany({ username: docs.username });
});

const userDB = model('User', userBlueprint);
module.exports = userDB;

