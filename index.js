const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


app.get('/', (req, res) => {
    res.send('Home');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is up and running."))