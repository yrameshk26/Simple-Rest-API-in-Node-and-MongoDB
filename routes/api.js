var express = require ('express');
var router = express.Router();
var User = require('../app/models/User');
// get a list of ninjas from the db
router.get('/user', function(req, res, next){
    User.find().then(function(user){
        res.send(user);
    });
});

// add a new ninja to the db
router.post('/user', function(req, res, next){
    User.create(req.body).then(function(user){
        res.send(user);
        console.log('Added a new user',user);
    }).catch(next);
});

// update a ninja in the db
router.put('/user/:id', function(req, res, next){
    User.findByIdAndUpdate({_id:req.params.id}, req.body).then(function(){
        User.findOne({_id:req.params.id}).then(function(user){
            res.send(user);
        });
    });
});

// delete a ninja from the db
router.delete('/user/:id', function(req, res, next){
    User.findByIdAndRemove({_id:req.params.id}).then(function(user){
        res.send(user);
    });
});

module.exports = router;
