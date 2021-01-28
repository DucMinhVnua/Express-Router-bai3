// lowdb
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { render } = require('pug');
const adapter = new FileSync('database.json');
const db = low(adapter);
db.defaults({ books: [] }).write(); // đoạn này để set default trong file json ta có một mạng posts rỗng
db.defaults({ users: [] }).write();
db.defaults({ transactions: [] }).write();

module.exports = db;