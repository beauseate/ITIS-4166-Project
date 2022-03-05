const { Datetime, DateTime } = require("luxon");
const {v4: uuidv4} = require('uuid');

const events = [
{
    id: '1',
    title: 'Alumni Career Fair',
    category: "professional",
    details: 'Come to the Alumni Career Fair!',
    location: 'Atkins Library',
    date: '9-25-22',
    startTime: '12:00pm',
    endTime: '3:00pm',
    host: 'Not Beau',
    image: '../IMG/UNCCTailgate.jpg'
},

{
    id: '2',
    title: '2022 Alumni Tailgate',
    category: 'social',
    details: 'Come tailgate with fellow 49er alumni in the final football home game of the season!',
    location: 'Alumni Pavillion',
    date: '11-04-22',
    startTime: '5:00pm',
    endTime: '9:00pm',
    host: 'Not Beau',
    image: '../IMG/UNCCTailgate.jpg'
},

{
    id: '3',
    title: 'LinkedIn Connect Party',
    category: "professional",
    details: 'Come to the LinkedIn Connect Party',
    location: 'Online',
    date: '1-30-22',
    startTime: '12:00pm',
    endTime: '3:00pm',
    host: 'Not Beau',
    image: '../IMG/UNCCTailgate.jpg'
},

{
    id: '4',
    title: 'Meet and Eat with Job Co.',
    category: "professional",
    details: 'Come to the LinkedIn Connect Party',
    location: 'Online',
    date: '1-30-22',
    startTime: '12:00pm',
    endTime: '3:00pm',
    host: 'Not Beau',
    image: '../IMG/UNCCTailgate.jpg'
},

{
    id: '5',
    title: '4th Annual Class of 2018 Hot Dog Cookout',
    category: "social",
    details: 'Come to the LinkedIn Connect Party',
    location: 'Online',
    date: '1-30-22',
    startTime: '12:00pm',
    endTime: '3:00pm',
    host: 'Not Beau',
    image: '../IMG/UNCCTailgate.jpg'
},

{
    id: '6',
    title: 'UNCC Family Weekend',
    category: "social",
    details: 'Come to the LinkedIn Connect Party',
    location: 'Online',
    date: '1-30-22',
    startTime: '12:00pm',
    endTime: '3:00pm',
    host: 'Not Beau',
    image: '../IMG/UNCCTailgate.jpg'
},



];

exports.find = function(){
    return events;
}

exports.findById = function(id){
    return events.find(event=>event.id === id);
}

exports.save = function(event){
    event.id = uuidv4();
    events.push(event)
}

exports.updateById = function(id, newEvent){
    let event = exports.findById(id);
    if(event){
        event.title = newEvent.title;
        event.content = newEvent.content;
        return true;
    } else{
        return false;
    }
}

exports.deleteById = function(id){
    let index = events.findIndex(event => event.id === id);
    if(index !== -1){
        events.splice(index, 1);
        return true;
    } else{
        return false;
    }
}