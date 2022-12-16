var express = require('express');
var app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const chatHistory = [];
const nicknames = [];

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  // Pass to next layer of middleware
  next();
});

// test
app.get('/', function (req, res, next) {
  res.json({ message: 'hsg chat-app api works...' });
});

// history
app.get('/history', function (req, res, next) {
  res.send(chatHistory);
});

app.post('/history', function (req, res, next) {
  const chatMessage = req.body?.message?.toString();
  const nickname = req.body?.nickname?.toString();

  if (!chatMessage) {
    res.status(400).send('Message is missing.');
    return;
  }

  if (!nickname) {
    res.status(400).send('Nickname is missing.');
    return;
  }

  const date = new Date();
  const message = {
    id: chatHistory.length + 1,
    message: chatMessage,
    nickname: nickname,
    createdAt: date,
  };

  chatHistory.push(message);

  res.json(message);
});

// nicknames
app.get('/nicknames', function (req, res, next) {
  res.send(nicknames);
});

app.get('/nicknames/:id', function (req, res, next) {
  // simple for loop
  //   for (var i = 0; nicknames.length > 0; i++) {
  //     var nickname = nicknames[i]

  //     if (nickname && nickname.id === req.params.id) {
  //       res.send({ username: nickname.username, id: nickname.id })
  //     }
  // }

  //   foreach in array
  //   nicknames.forEach((nickname) => {
  //     if (nickname && nickname.id === req.params.id) {
  //       res.send({ username: nickname.username, id: nickname.id })
  //     }
  //   })

  // build-in .find function
  const id = +req.params.id;
  const nickname = nicknames.find((e) => e.id === id);

  if (!nickname) {
    res.status(404).send('Nickname not found.');
    return;
  }

  res.send(nickname);
});

app.post('/nicknames', function (req, res, next) {
  const userName = req.body?.nickname?.toString();

  if (!userName) {
    res.status(400).send('Nickname is missing.');
    return;
  }

  if (!isNicknameUnique(userName)) {
    res.status(409).send(`Nickname ${userName} already exists.`);
    return;
  }

  const date = new Date();
  const nickname = {
    id: nicknames.length + 1,
    nickname: userName,
    createdAt: date,
  };

  nicknames.push(nickname);

  res.json(nickname);
});

app.delete('/nicknames/:id', function (req, res, next) {
  const id = +req.params.id;
  const nickName = nicknames.find((e) => e.id === id);

  if (!nickName) {
    res.status(404).send('Nickname not found.');
    return;
  }

  const index = nicknames.findIndex((e) => e.id === id);

  if (index < 0) {
    res.status(404).send('Nickname id not found.');
    return;
  }

  nicknames.splice(index, 1);

  res.send('Nickname deleted.');
});

function isNicknameUnique(nickName) {
  return !nicknames?.some((e) => e.userName === nickName);
}

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});