const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {type: String, required: [true, 'title is required']},
    category: {type: String, required: [true, 'category is required']},
    details: {type: String, required: [true, 'details are required'], minLength: [10, 'the details should be atleast 10 characters']},
    location: {type: String, required: [true, 'location is required']},
    date: {type: String, required: [true, 'date is required']},
    startTime: {type: String, required: [true, 'start time is required']},
    endTime: {type: String, required: [true, 'end time is required']},
    host: {type: String, required: [true, 'host is required']},
    image: {type: String, required: [true, 'image URL is required']},},
);

//collection name is events in DB
module.exports = mongoose.model('Event', eventSchema);
