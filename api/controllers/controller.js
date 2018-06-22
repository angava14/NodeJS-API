"use strict";

const User = require("./../models/model");
const config = require("./../../config");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const saltRounds = 10;

exports.params = (req, res, next, id) => {

    User.findById(id)
        .then( user => {
            if (user) {
                req.user = user;
                next();
            } else {
                res.json({
                    "message": "User not found"
                });
            }
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.validateToken = (req, res, next) => {
    const token = req.body.token ||  req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, 
                    config.secret, 
                    function(err, decoded) {     
                        if (err) {
                            return res.json({ success: false, message: 'Failed to authenticate token.' });    
    
                        } else {
                            next();
                        }
                    });
      } else {
        return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
      }
};
exports.all = (req, res, next) => {
            User.find()
            .then( users => {
                res.json(users);
            })
            .catch( err => {
                next(new Error(err));
            });      
};


exports.post = (req, res, next) => {
    console.log(req);
    let body = req.body; 
    const user = new User(body);
    console.log(user);
    user.save()
        .then( newuser => {
            res.json(newuser);
        })
        .catch( err => {
            next(new Error(err));
        });
};



exports.logout = (req, res, next) => { 

};

exports.login = (req, res, next) => { 
    console.log(req.body.email);
     User.findOne({
     email: req.body.email
          }, function(err, user) {
            console.log(err)
            if (err) throw err;
        
            if (!user) {
                console.log("auth failed, user not found");
                
              res.json({ success: false, message: 'Authentication failed. User not found.', error:1 });
            } else if (user) {
           
              
                
                var token = jwt.sign(user.toObject(),'proyectofinal');
                
                res.json({
                  error:0,
                  success: true,
                  message: 'Access granted',
                  token: token
                  
                });
            }
        
        
          });
};

exports.test = (req, res, next) => {
    return res.json({respuesta:"true test"})
};
exports.get = (req, res, next) => {

    return res.json({success:"true get "});
};

exports.getuno = (req, res, next) => {
    
    return res.json({success:"true get uno"});
};

exports.delete = (req, res, next) => { 
};
exports.put = (req, res, next) => { 
};