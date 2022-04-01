const model = require('../models/event');
exports.connections = (req, res)=>{
    //res.send('send all stories');
    model.find()
    .then(events=>res.render('./event/connections', {events}))
    .catch(err=>next(err));
};

exports.newConnection = (req, res)=>{
    res.render('./event/newConnection');
};

exports.createConnection = (req, res)=>{
     //res.send('Created a new story');
     let event = new model(req.body);//Create new story document in mongodb
     event.save()//Insert in db
     .then(event=> res.redirect('/events'))
     .catch(err=>{
         if(err.name === 'ValidationError'){
             err.status = 400;
         }
         next(err);
     });
};

exports.showConnection = (req, res, next)=>{
    let id = req.params.id;
    //obj id is 24 bits hexadecmal string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
            let err = new Error('Invalid event ID');
            err.status = 400;
            return next(err);
    }
    model.findById(id)
    .then(event=>{
        if(event) {
            return res.render('./event/connection', {event});
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err))
};

exports.editConnection = (req, res, next)=>{
    let id = req.params.id;
    //obj id is 24 bits hexadecmal string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
            let err = new Error('Invalid event ID');
            err.status = 400;
            return next(err);
    }
    model.findById(id)
    .then(event=>{
        if(event) {
            return res.render('./event/edit', {event});
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err))
};

exports.updateConnection = (req, res, next)=>{
    let event = req.body;
    let id = req.params.id;
    if(model.updateById(id, event)){
        res.redirect('/events/'+id);
    }else{
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.deleteConnection = (req, res, next)=>{
    let id = req.params.id;
    if(model.deleteById(id)){
        res.redirect('/events');
    }else{
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
};