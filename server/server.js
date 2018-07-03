const {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
var app =express();

const port = process.env.PORT || 3000;

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
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectId.isValid(id)) {
        return res.status(404).send();
    }
   
    if(ObjectId.isValid(id)){
        Todo.findById(id).then((todos) => {
            res.send({todos});
        })
    }
    else {
        res.send('error');
        console.log('error');
    }

})


app.listen(port, () => {
    console.log(`statred at port : ${port}`)
});

module.exports = {
    app
}