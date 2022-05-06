const model = require('../models/event');
const rsvpModel = require('../models/rsvp');

exports.connections = (req, res)=>{
    //res.send('send all stories');
    model.find()
    .then(events=>{
        var categories = new Set();
        if(events){
            events.forEach(event=>{
                categories.add(event.category);
            })
        }
        res.render('./event/connections', {events, categories})
    })
    .catch(err=>next(err));
};

exports.newConnection = (req, res)=>{
    res.render('./event/newConnection');
};

exports.createConnection = (req, res, next)=>{
    let event = new model(req.body);//create a new event document
    event.host = req.session.user;
    event.save()//insert the document to the database
    .then(event=> {
        req.flash('success', 'Event has been created successfully');
        res.redirect('/events');
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
        req.flash('error', err.message);
        return res.redirect('/back');
        }
        next(err);
    });
    
};

exports.showConnection = (req, res, next)=>{
    let id = req.params.id;
    Promise.all([model.findById(id).populate('host', 'firstName lastName'), rsvpModel.findOne({eventID: id})])
    .then(response=>{
        let event = response[0];
        let rsvp = response[1];
        if(event) {       
            res.render('./event/connection', {event, rsvp})
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.editConnection = (req, res, next)=>{
    let id = req.params.id;
    model.findById(id)
    .then(event=>{
        return res.render('./event/edit', {event});
    })
    .catch(err=>next(err));
};

exports.updateConnection = (req, res, next)=>{
    let event = req.body;
    let id = req.params.id;

    model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
    .then(event=>{
        req.flash('success', 'Event has been updated successfully');
        return res.redirect('/events/'+id);
    })
    .catch(err=> {
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('/back');
        }
        next(err);
    });
};

exports.deleteConnection = (req, res, next)=>{
    let id = req.params.id;
    
    Promise.all([model.findByIdAndDelete(id, {useFindAndModify: false}), rsvpModel.findOneAndDelete({eventID: id})])
    .then(result =>{
        req.flash('success', 'Event has been deleted successfully');
        res.redirect('/events');
    })
    .catch(err=>next(err));
};

exports.createOrRSVP = (req, res, next)=>{
    let eventID = req.params.id;
    let userID = res.locals.user;
    rsvpModel.findOne({eventID: eventID})
    .then(eventFound=>{
        if(eventFound){
            rsvpModel.findOne({eventID: eventID})
            .then(userRSVP=>{
                for(let i = 0; i < userRSVP.rsvpUsers.length; i++){
                    if(userRSVP.rsvpUsers[i] == userID){
                        req.flash('error', "You have already RSVP'd to this event");
                        return res.redirect('/events/'+eventID);
                    }
                }
            eventFound.rsvpUsers.push(userID);
            eventFound.save();
            req.flash('success', "You have RSVP'd to this event");
            return res.redirect('/users/profile'); 
        })
        .catch(err=>{
            if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);
            return res.redirect('/back');
            }
            next(err);
        });

        } else{
            let rsvp = new rsvpModel();//create a new rsvp document
            model.findById(eventID)
            .then(event=>{
                rsvp.rsvpUsers = userID;
                rsvp.eventID = eventID;
                rsvp.eventTitle = event.title;
                rsvp.eventCategory = event.category;
                rsvp.save()//insert the document to the database
            .then(rsvp=> {
                req.flash('success', "You have RSVP'd successfully");
                return res.redirect('/users/profile');
            })
            .catch(err=>{
                if(err.name === 'ValidationError' ) {
                req.flash('error', err.message);
                return res.redirect('/back');
                }
                next(err);
            });
            })
        }
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
        req.flash('error', err.message);
        return res.redirect('/back');
        }
        next(err);
    })
    
};



exports.unRSVP = (req, res, next)=>{
    let id = req.params.id;
    let userID = res.locals.user;
    rsvpModel.findOne({eventID: id})
    .then(eventFound=>{
        if(eventFound){
            rsvpModel.findOne({eventID: id})
            .then(userRSVP=>{
            for(let i = 0; i < userRSVP.rsvpUsers.length; i++){
                if(userRSVP.rsvpUsers[i] == userID){
                    userRSVP.rsvpUsers.pull(userID);
                    userRSVP.save();
                    req.flash('success', "You have un-RSVP'd from this event");
                    return res.redirect('/users/profile');
                }
        }
            req.flash('error', "You have not RSVP'd to this event");
            res.redirect('/events/' + id);
        })
        .catch(err=>{
            if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);
            return res.redirect('/back');
            }
            next(err);
        });

        } else{
            req.flash('error', "You need to RSVP'd first!");
            res.redirect('/events/' + id);
        }})
    .catch(err=>next(err));
};