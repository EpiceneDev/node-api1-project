const express = require('express');

const db = require('./data/db');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Server is talking!');
});

server.get('/api/users', (req, res) => {
    db.find(id)
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        console.log('error', err);
        res.status(500).json({ error: 'failed to get users from db' });
      });
  });

server.get('/api/users/:id', (req, res) => {
    db.findById()
        .then(users => {
        res.status(200).json(users);
        })
        .catch(err => {
        console.log('error', err);
        res.status(500).json({ error: 'failed to get users from db' });
        });
});

server.post('/api/users', (req, res) => {
    const user = req.body;

    console.log('user', user);

    db.insert(user)
        .then(user => {
        res.status(201).json(user);
        })
        .catch(err => {
        console.log('error', err);
        res.status(500).json({ error: 'failed to add the user to the db' });
        });
});

server.put('/api/users/:id', (req, res) => {
    const user = req.body;

    console.log('user', user);

    db.update(user, id)
        .then(user => {
        res.status(201).json(user);
        })
        .catch(err => {
        console.log('error', err);
        res.status(500).json({ error: 'failed to add the user to the db' });
        });
});

  server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
  
    db.remove(id)
      .then(id => {
        res.status(200).json({ message: `users with id ${id} deleted` });
      })
      .catch(err => {
        console.log('error', err);
        res.status(500).json({ error: 'failed to delete the user from the db' });
      });
  });

server.listen(8000, () => console.log('\n=== API on port 8000 ===\n'));
