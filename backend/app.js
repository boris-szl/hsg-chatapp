const express = require('express');
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post("/api/chats", (req, res, next) => {
    const chat = req.body;
    console.log(chat);
    res.status(201).json({
        message: 'Chat message sent!'
    });
});

app.get('/api/chats', (req, res, next) => {
    const chats = [
        { id: 'user01', username: 'frodo', content: "This is coming from the server"},
        { id: 'user02', username: 'gandalf', content: "This is coming from the server"},
    ];
    res.status(200).json({
        message: 'Chats received!',
        chats: chats
    });
})

app.get('/api/user', (req, res, next) => {
    const user = [
        {
            username: "Frodo"
        }
    ];
    res.status(200).json({
        message: 'Username received!',
        user: user
    });
});

app.post("/api/user", (req, res, next) => {
    const user = req.body;
    console.log(user);
    res.status(201).json({
        message: 'Username sent!'
    });
});

// app.get('/api/users)
// app.post('/api/users)

// app.post


module.exports = app;