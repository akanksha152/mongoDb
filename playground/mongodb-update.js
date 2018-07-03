// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');
const express = require('express');

// var app = express();

// var obj = new ObjectID();
// console.log(obj);

// var user = {
//     name: 'andrew',
//     age: 25
// };
// var {name} = user;

var a;

// var port = procees.env.PORT  || 3000;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
        if(err) {
           return console.log('unable to connect to mongoDb server', err);
        }
        console.log('connected to MOngoDb server');

        const db = client.db('TodoApp');
        //deleteMany

        // db.collection('UsersWithId').deleteMany({'name' : 'Apoorva'}).then((res) => {
        //     console.log(res.result);
        // });

        //deleteOne 
        // db.collection('UsersWithId').deleteOne({a :1}).then(res => console.log(res.result));

        //findOneAndDelete

        db.collection('UsersWithId').findOneAndUpdate({name : 'apoorva'}, {
            $set: {
                age: 50
            }
        }, {
            returnOriginal: false

        }).then((res) => {
            console.log(res);
        })




        client.close();
});

// app.get('/', (req, res) => {
//  res.send(a);
// });

// app.listen(port);