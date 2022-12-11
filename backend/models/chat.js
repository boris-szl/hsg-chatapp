const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    username: { type: String },
    message: { type: String },
    date: { type: String }
});

module.exports = mongoose.model('Chat', chatSchema);