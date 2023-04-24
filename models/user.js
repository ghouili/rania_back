const mongoose = require('mongoose');

const UserSchema =  new mongoose.Schema({
    email: {type: String, require: true, unique: true},
    name: {type: String},
    cin: {type: Number},    
    password: {type: String},
});

module.exports = mongoose.model('user', UserSchema);