const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, default: "Mock User", required: true},
    profilePicture: {type: Buffer}
});

module.exports = mongoose.model('User', userSchema);
