const db = require('mongoose');

db.connect('mongodb://localhost:27017/authApiUserNode', {
   useNewUrlParser: true,
   useUnifiedTopology: true 
})
    .then(res => console.log('bd connect'))
    .catch(err => console.log(err))

module.exports = db;