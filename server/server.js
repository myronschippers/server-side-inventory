const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = '5000';
const inventory = require('./modules/inventory.js');

// Kick off server application
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})

// Setting up needed middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes will go below here
app.get('/api/inventory', (req, res) => {
    res.send(inventory);
});

app.post('/api/inventory', (req, res) => {
    const newInventoryItem = req.body;
    inventory.push(newInventoryItem);

    res.status(201);
});

app.post('/api/inventory/search', (req, res) => {
    const searchResults = [];
    const searchString = req.body;
    for (let inventoryItem of inventory) {
        if (inventoryItem.name.includes(searchString)) {
            searchResults.push(inventoryItem);
        }
    }

    res.send(searchResults);
});
