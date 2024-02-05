//THIS IS FOR THE SCHEMA !!!!

let { Types, Schema } = require("mongoose");
let writeDate = require("../utils/dateFormat");

const reactionBlueprint = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (dateCreated) => dateFormat(dateCreated),
        }
    }
);

module.exports = reactionBlueprint;