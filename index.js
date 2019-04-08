const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(cors());

app.use('/', express.static(path.join(__dirname, '/client/build')));

app.get('/', (req, res) => {
    res.send('Home');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is up and running."))