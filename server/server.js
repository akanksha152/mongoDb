const {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var express = require('express');
var bodyParser = require('body-parser');

var app =express();

// var newTodo = new Todo({
//     text: 'Cooking dinner'
// }); 


//  var newTodo2 = new Todo({
//      text: 'Hurrey',
//      completed: true,
//      completedAt: 2016
//  });

// newTodo2.save();

// newTodo.save().then((doc) => {
//     console.log('saved todo', doc);
// }, (e) => {
//     console.log('unable to save todo')
// });

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo ({
        text: req.body.text,
        completed: req.body.completed
    });
    todo.save().then((doc)=>{
        res.send(doc);
        console.log(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
Todo.find().then((todos) => {
res.send({todos});
}, (e) => {
    res.status(400).send(e);
})
})


app.listen(3000);

module.exports = {
    app
}