const {validationResult} = require('express-validator');
const validator = require('validator');
const {body} = require('express-validator');

exports.validateId = (req, res, next)=>{
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};
exports.validateSignUp = 

    [body('firstName', "First Name cannot be empty").notEmpty().trim().escape(),
    body('lastName', 'Last Name cannot be empty').notEmpty().trim().escape(),
    body('email', "Email must be a valid email address").isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be atleast 8 characters and at most 64 characters').isLength({min: 8, max: 64})];

exports.validateLogin = 
    [body('email', "Email must be a valid email address").isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be atleast 8 characters and at most 64 characters').isLength({min: 8, max: 64})];

exports.validateEvent = 
    [body('title', "Title Name cannot be empty").notEmpty().trim().escape(),
    body('details', 'Details must be atleast 10 characters').isLength({min: 10}).trim().escape(),
    body('category', "Category cannot be empty").notEmpty().trim().escape(),
    body('location', "Location cannot be empty").notEmpty().trim().escape(),
    body('date', "Date cannot be empty").notEmpty().trim().escape(),
    body('startTime', "Satrt Time cannot be empty").notEmpty().trim().escape(),
    body('endTime', "End Time cannot be empty").notEmpty().trim().escape(),
    body('image', "Image cannot be empty").notEmpty().trim()

];


exports.validateResult = (req, res, next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach(error=>{
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    } else{
        return next();
    }
}

exports.isDate = (req, res, next)=>{
    let date = req.body.date;
    if(validator.isDate(date)){
        return next();
    } else{
        let err = new Error('Invalid date');
        req.flash('error', err.msg);
        err.status = 400;
        return next(err);
    }
}

exports.isAfter = (req, res, next)=>{
    let date = req.body.date;
    if(validator.isAfter(date)){
        return next();
    } else{
        let err = new Error('Date is back in time!');
        req.flash('error', err.msg);
        err.status = 400;
        return next(err);
    }
}

exports.startMatches =  (req, res, next)=>{
    let startTime = req.body.startTime;
    var validate = new RegExp(/^(([[0|1]\d)|(2[0-3]))[:]?([0-5]\d)$/);
    if(validate.test(startTime)){
        return next();
    } else{
        let err = new Error('Start time is not valid!');
        req.flash('error', err.msg);
        err.status = 400;
        return next(err);
    }
}


 exports.endMatches =  (req, res, next)=>{
    let endTime = req.body.endTime;
    var validate = new RegExp(/^(([[0|1]\d)|(2[0-3]))[:]?([0-5]\d)$/);
    if(validate.test(endTime)){
        return next();
    } else{
        let err = new Error('End time is not valid!');
        req.flash('error', err.msg);
        err.status = 400;
        return next(err);
    }
}

exports.validTime =  (req, res, next)=>{
    let startTime = parseInt(req.body.startTime);
    let endTime = parseInt(req.body.endTime);
    if(startTime - endTime > 0){
        let err = new Error('You start time is before your end time!');
        req.flash('error', err.msg);
        err.status = 400;
        return next(err);
    } else{
        return next();
    }
}



