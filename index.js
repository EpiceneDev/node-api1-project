const express = require('express');

const db = require('./data/db');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Server is talking!');
});

server.get('/api/users', (req, res) => {
    const users = [
        {
        id: 1,
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String
        // created_at: Mon Oct 28 12:50:16 GMT-0700 (PDT), // Date, defaults to current date
        // updated_at: Mon Oct 28 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
        }
    ];

    res.status(200).send(users);
})

server.post('/api/users', (req, res) => {
    const usersInfo = req.body;
    
    console.log('users info: ', usersInfo);
    db.add(usersInfo)
    .then(users => {
        res.status(201).json(users);
    })
    .catch(err => {
        console.log('error', err);
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        
    })
});

server.listen(8000, () => {
    console.log('API is running on port 8000');
});
