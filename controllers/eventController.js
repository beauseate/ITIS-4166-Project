const model = require('../models/event');

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
    let event = new model(req.body);//create a new story document
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
    model.findById(id).populate('host', 'firstName lastName')
    .then(event=>{
        if(event) {       
            return res.render('./event/connection', {event});
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
    
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event =>{
        req.flash('success', 'Event has been deleted successfully');
        res.redirect('/events');
    })
    .catch(err=>next(err));
};