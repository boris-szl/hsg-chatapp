const dotenv = require("dotenv").config()

const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require("mongoose");

const db_password = process.env.DB_PW

mongoose.connect(`mongodb+srv://hsgchatapp:${db_password}@hsgchatapp.tjbi9gb.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Connected to database!");
        console.log(process.env.DB_PW)
    })
    .catch(() => {
        console.log("Connection failed!")
    });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))



app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

const Chat = require('./models/chat.js');
const User = require('./models/user.js');
const chat = require("./models/chat.js");

app.post("/api/chats", (req, res, next) => {
    const chat = new Chat({
        username: req.body.username,
        message: req.body.message,
        // date: req.body.date
    });

    if (chat.username)

    chat.save().then(createdPost => {
        res.status(201).json({
            message: 'Chat message sent!',
            chatId: createdPost._id
        });
    })
});

app.post("/api/user", (req, res) => {
    const user = new User({
        username: req.body.username
    });
    user.save().then(201).json({
        message: 'User saved!',
    })
})

app.get('/api/chats', (req, res, next) => {
    Chat.find().then(documents => {
        res.status(200).json({
            message: 'Chats received!',
            chats: documents
        });
    });
});


module.exports = app;