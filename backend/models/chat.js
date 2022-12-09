const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    username: { type: String, default: "Mock User"},
    message: { type: String, default: "Mock Message"},
    date: { type: String }
});

module.exports = mongoose.model('Chat', chatSchema);