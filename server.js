const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');

const UserRouter = require('./routes/user');

const PORT = 5000;
const server = express();

server.use(body_parser.json());

server.get('/', (req, res) => {
    return res.send('Hello world!!');
});

server.use('/user', UserRouter);

mongoose.connect('mongodb+srv://admin:admin@pfe.eomjtm9.mongodb.net/?retryWrites=true&w=majority')
.then(result => server.listen(PORT, () => console.log(`server is running on port ${PORT}`)))
.catch(err => console.log(err));