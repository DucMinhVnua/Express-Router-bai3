const express = require('express');
const router = express.Router();
const db = require('../db');

// Home books 
router.get('/', function (req, res) {
    const books = db.get('books').value();
    res.render('books', {
      books: books
    });
  })
  
  // Create books
router.get('/create', function (req, res) {
    res.render('add');
  })
  
router.get('/add/book', function (req, res) {
    const ID = function () {
      return Math.random();
    };
  
    const queryParamBook = req.query;
    queryParamBook.id = ID();
    console.log(queryParamBook);
    if(queryParamBook.title != '') {
      db.get('books').push(queryParamBook).write();
      res.redirect('/books');
    }
})
  
// update book
router.get('/update/:id', function (req, res){
    res.render('update', {
      id: req.params
    });
})
  
router.get('/create/updatebook/:idBook', function (req, res){
    const id = parseFloat(req.params.idBook);
    const book = db.get('books').find({id: id}).assign({description: req.query.description}).write();
    res.redirect('/books');
})
  
  
// delete book
router.get('/delete/:id', function (req, res) {
    const id = parseFloat(req.params.id);
    const book = db.get('books').remove({id: id}).write();
    res.redirect('/books');
})

module.exports = router;