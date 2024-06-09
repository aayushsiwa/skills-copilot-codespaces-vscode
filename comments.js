// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const comments = require('./comments.json');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const { username, comment } = req.body;

  if (!username || !comment) {
    res.status(400).send('Username and comment are required');
    return;
  }

  const newComment = {
    id: uuidv4(),
    username,
    comment
  };

  comments.push(newComment);
  fs.writeFileSync('./comments.json', JSON.stringify(comments, null, 2));

  res.status(201).send(newComment);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});