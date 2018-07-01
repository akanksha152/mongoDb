// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');
const express = require('express');

var app = express();

// var obj = new ObjectID();
// console.log(obj);

// var user = {
//     name: 'andrew',
//     age: 25
// };
// var {name} = user;

var a;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
        if(err) {
           return console.log('unable to connect to mongoDb server', err);
        }
        console.log('connected to MOngoDb server');

        const db = client.db('TodoApp');

        // db.collection('Todos').insertOne({
        //     name: 'akanksha',
        //     age: 23

        // }, (err, res)=> {
        //     if(err) {
        //         return console.log('unable to inset todo', err);
        //     }
        //     console.log(JSON.stringify(res.ops, undefined, 2));
        // });
        // db.collection('UsersWithId').insertOne({
        //     name: 'Apoorva',
        //     age: 23,
        //     location: 'hinjewadi pune',
        //     _id: 'aka1223'
        // }, (err, res) => {
        //     if(err) {
        //         return console.log('unable to insert in users', err);
        //     }
        //     console.log(JSON.stringify(res.ops, undefined, 2));
        // })

        db.collection('UsersWithId').find({location: "hinjewadi pune"}).toArray().then((docs) => {
            console.log('Todos');
            a = docs;
            console.log(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            console.log(err);
        })

        // db.collection('UsersWithId').find({
        //     _id: new ObjectID('5b388181b6fc0fdcb0d81288')
        // }).toArray().then(((docs)=>{
        //         console.log(JSON.stringify(docs, undefined, 2));
        //     }))

        // db.collection('UsersWithId').find().count().then(((count)=>{

        //         console.log(count);
        //     }))

        client.close();
});

app.get('/', (req, res) => {
 res.send(a);
});

app.listen(3000);