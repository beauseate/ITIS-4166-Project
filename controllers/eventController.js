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
    let event = req.body;
    model.save(event);
    res.redirect('/events');
};

exports.showConnection = (req, res, next)=>{
    let id = req.params.id;
    let event = model.findById(id);
    if(event){
        res.render('./event/connection', {event});
    }else{
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.editConnection = (req, res, next)=>{
    let id = req.params.id;
    let event = model.findById(id);
    if(event){
        res.render('./event/edit', {event});
    }else{
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
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