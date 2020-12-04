const express = require('express');
const app = express();
const port = 3001;

const between = (min, max) => Math.floor(Math.random() * (max - min) + min);

app.get('/api/user/:id', (req, res) => {
  setTimeout(() => {
    const users = [
      { id: 24, name: 'Isabelle' },
      { id: 42, name: 'Patrick' },
    ];
    const user = users.find(({ id }) => id.toString() === req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  }, between(500, 2500));
});

app.listen(port, () => {});
