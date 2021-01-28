const express = require('express');
const router = express.Router();
const db = require('../db');

// home transaction
router.get('/', function (req, res){
    const transactions = db.get('transactions').value();
    res.render('transaction', {
        transactions: transactions
    });
});
  
  
router.post('/', function (req, res){
});
  
// create transaction
router.get('/create', function (req, res){
    const users = db.get('users').value();
    const books = db.get('books').value();
  
    res.render('createTransaction', {
      users: users,
      books: books
    });
})
  
router.post('/create', function (req, res){
    const user = db.get('users').find({name: req.body.user}).value();
    const book = db.get('books').find({title: req.body.book}).value();
  
    const transactionUser = db.get('transactions').push({userId: user.id,bookId: book.id, nameUser: user.name, nameBook: book.title}).write();
  
    res.redirect('/transaction');
})

module.exports = router;