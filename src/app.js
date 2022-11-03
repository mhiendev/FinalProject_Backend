const express = require('express');
const cors = require('cors');
//const contactController = require('./controllers/contact.controller');
const ApiError = require('./api-error');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to online store application.' });
});


module.exports=app;