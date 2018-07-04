
require('./../config/config');

const {mongoose} = require('./db/mongoose');
const _ = require('lodash');
var {Todo} = require('./models/todo');
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
var app =express();

const port = process.env.PORT || 3003;

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

});
app.delete('/todos/delete/:id', (req, res) => {
    var id = req.params.id;
    
console.log(id);
    if(!ObjectId.isValid(id)) {
        console.log('sddad');
        return res.status(404).send();
    };
    if(ObjectId.isValid(id)){
        Todo.findByIdAndRemove(id).then((todos) => {
            if(!todos) {
                res.status(404).send();
            }
            console.log(todos);
            res.send({todos});
        }).catch(err => res.status(404).send());
    }
    else {
        res.status(404).send('error');
        console.log('error');
    }
});


app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectId.isValid(id)){
        console.log(id);
        return res.status(404).send();
    }
    console.log(body);
    if(_.isBoolean(body.completed)&& body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            res.status(404).send();
        }
       
        res.send({todo});
    }).catch(err => res.status(404).send())
})

app.listen(port, () => {
    console.log(`statred at port : ${port}`)
});

module.exports = {
    app
}