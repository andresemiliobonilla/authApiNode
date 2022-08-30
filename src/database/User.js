const {Schema, model} = require('mongoose');

const modelUser = new Schema({
    email: String,
    user: String,
    pass: String
})

module.exports = model('User', modelUser);