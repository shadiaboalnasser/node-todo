const express = require('express');
const todoController = require('./controllers/todoController');
const app = express();

// template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

// fire controller
todoController(app);

//listen to port
app.listen(3000);


