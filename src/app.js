// require express and make an app
const express = require('express');
const app = express();
// require path
const path = require('path');

// add middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

// listen on port 3000
app.listen(3000);
