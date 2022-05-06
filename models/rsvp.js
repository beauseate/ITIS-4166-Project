const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    eventID: {type: Schema.Types.ObjectId, ref: 'Event'},
    eventTitle: {type: String},
    eventCategory: {type: String},
    rsvpUsers: {type: Array},}
);

//collection name is RSVP in DB
module.exports = mongoose.model('RSVP', rsvpSchema);