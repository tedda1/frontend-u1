const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let users = [];
let currentId = 1;

app.get('/users', (req, res) => res.json(users));

app.post('/users', (req, res) => {
  const user = { id: currentId++, ...req.body };
  users.push(user);
  res.json(user);
});

app.put('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { id, ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).send();
  }
});

app.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  users = users.filter(u => u.id !== id);
  res.sendStatus(204);
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
