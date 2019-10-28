const express = require('express');

const db = require('./data/db');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Server is talking!');
});

server.listen(8000, () => {
    console.log('API is running on port 8000');
});

// server.post('/api/users', (req, res) => {
//     const usersInfo = req.body;

//     console.log('users info: ', usersInfo);
//     db.add(usersInfo)
//         .then(users => {
//             res.status(201).json(users);
//         })
//         .catch(err => {
//             console.log('error', err);
//             res.status(400).json({ errorMessage: "Please provide name and bio for the user." })

//         })
// });

