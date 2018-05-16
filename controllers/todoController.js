var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://test:test@ds163060.mlab.com:63060/node-todo');

//create a schema for data
const todoSchema = new mongoose.Schema({
    item: String
});
 // create model for data
const Todo = mongoose.model('Todo', todoSchema);



var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {

    app.get('/todo' ,function (req,res) {
        Todo.find({} , (err,data) => {
            if (err) throw err;
            res.render('todo' , {todos: data})
        });
    });

    app.post('/todo' ,urlencodedParser ,function (req,res) {
        var newTodo = Todo(req.body).save((err,data)=>{
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item' ,function (req,res) {
        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove((err,data)=>{
            if (err) throw err;
            res.json(data)
        });
    });
};
