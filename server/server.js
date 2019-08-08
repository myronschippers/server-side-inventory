const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = '5000';

// Kick off server application
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})

// Setting up needed middleware
app.use(express.static('../public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes will go below here
