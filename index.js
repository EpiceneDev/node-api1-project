const express = require('express');

const db = require('./data/db');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Server is talking!');
});

server.get('/api/users', (req, res) => {
    db.find()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        console.log('error', err);
        res.status(500).json({ error: "The users information could not be retrieved." });
      });
  });

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(user => {
        res.status(200).json(user);
        })
        .catch(err => {
        console.log('error', err);
        res.status(500).json({ error: 'failed to get user from db' });
        });
});


server.post("/api/users", (req, res) => {
  const userInformation = req.body;
  (req.params.name && req.params.bio) ?
    db.insert(userInformation)
      .then(id => {
        
          res.status(201).json(id);
        })
      .catch(err => {
          res
            .status(400)
            .json({ errorMessage: "Please provide name and bio for user." });
        })
    :
      res.status(500).json({ error: "failed to add the user to the db" });
});

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;
    console.log('user', user);

    db.update(id, user)
        .then(updatedUser => {
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
      .then(res => {
        if (id) {
          res.status(200).json({ message: `users with id ${id} deleted` });
        } else {
          res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
      })
      .catch(err => {
        console.log('error', err);
        res.status(500).json({ error: "The user could not be removed" });
      });
});

server.listen(8000, () => console.log('\n=== API on port 8000 ===\n'));
