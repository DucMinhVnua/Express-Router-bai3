const express = require('express');
const router = express.Router();
const db = require('../db');

// home users
router.get('/', function (req, res) {
    const users = db.get('users').value();
    res.render('users', {
      users: users
    });
})

  
// create user
router.get('/create', function (req, res) {
    res.render('addusers');
})

router.get('/add/user', function (req, res) {
    const ID = function () {
    return Math.random();
    };

    const queryParamUser = req.query;
    queryParamUser.id = ID();
    console.log(queryParamUser);
    if(queryParamUser.name != '') {
    db.get('users').push(queryParamUser).write();
    res.redirect('/users');
    }
})

// update user
router.get('/update/:id', function (req, res){
    res.render('updateusers', {
    id: req.params
    });
})

router.get('/update/updateuser/:id', function (req, res){
    const id = parseFloat(req.params.iduser);
    const book = db.get('users').find({id: id}).assign({name: req.query.name}).write();
    res.redirect('/users');
})

// delete user
router.get('/delete/:id', function (req, res) {
    const id = parseFloat(req.params.id);
    const user = db.get('users').remove({id: id}).write();
    res.redirect('/users');
})

// View user
router.get('/view/:id', function (req, res) {
    const id = parseFloat(req.params.id);
    const user = db.get('users').find({id: id}).value();
    res.render('viewuser', {
    names: user
    });
})

module.exports = router;