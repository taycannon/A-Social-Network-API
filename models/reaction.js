const { Schema, Types } = require('mongoose');
const {format_date} = require('../utils/helpers.js')

const reactionSchema = new Schema({
    reactionId: {type: Schema.Types.ObjectId, default: () =>  new Types.ObjectId()},
    reactionBody: {type: String, required: true, max_length: 280},
    username: {type: String, required: true},
    createdAt: {type: Date, default: Date.now(),
    get: timeStamp => format_date(timeStamp)
    },
},
{
    toJSON: {
        getters: true,
        virtuals: true,
    },
    id: false,
    _id: false,
},
);

module.exports = reactionSchema;