const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

// Todo.remove({}).then((res) => {
//     console.log(res);
// }).catch(err=> console.log(err));


//findOneAndRemove

Todo.findByIdAndRemove('5b3c2f7c7b29d98ce26b9ccb').then(res => console.log(res));