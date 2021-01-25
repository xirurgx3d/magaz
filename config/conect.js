const mongoose = require('mongoose');
mongoose.Promise = Promise
const dbPath = 'mongodb://localhost:27017/curses';
const options = {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false}
const mongo = mongoose.connect(dbPath, options);

module.exports = { mongo }
