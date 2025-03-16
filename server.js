// dependencies & variables
const express = require('express');
const path = require('path');
const logger = require('morgan');

require('dotenv').config();
require('./config/database');

const app = express();

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.use(require('./config/checkToken'));

// user routes
app.use('/api/users', require('./routes/api/users'));

// protect all routes other than users routes
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/projects', ensureLoggedIn, require('./routes/api/projects'));

// catch all
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})

// listener
const port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log(`Express app running on port ${port}`)
});