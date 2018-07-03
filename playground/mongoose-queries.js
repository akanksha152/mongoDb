const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');


var id = '5b3b5b3d14b4625cd649d4ce';

if(!ObjectId.isValid()) {
    console.log('ID not valid');
} 

// Todo.find({
//     _id: id
// }).then((todos) => {
//     if(!todos) {
//         return console.log('Id not found');
//     }
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todos) => {
//     if(!todos) {
//         return console.log('Id not found');
//     }
//     console.log('Todos By One', todos);
// });

Todo.findById(id).then((todo) => {
    if(!todo) {
        return console.log('Id not found');
    }
    console.log('Todo By Id', todo)
}).catch((e) => console.log(e));