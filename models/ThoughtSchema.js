const { model, Schema } = require('mongoose');
const reactionBlueprint = require('./ReactionSchema');
const dateFormat = require('../utils/dateFormat');
const thoughtBlueprint = new Schema(
  {
    thoughtText: {
      type: String,
      minlength: 1,
      maxlength: 280,
      required: true
      
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },

    reactions: [reactionBlueprint]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);
thoughtBlueprint.virtual('reactionCount').get(function() {
  return this.reactions.length;
});
const ThoughtDB = model('Thought', thoughtBlueprint);
module.exports = ThoughtDB;


