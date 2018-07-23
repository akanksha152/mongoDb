const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
}

var token = jwt.sign(data, 'secret123');

console.log(token);
var decoded = jwt.verify(token, 'secret123');
console.log(decoded);

// var msz = 'Hii, I m Akanksha';

// var hash = SHA256(msz).toString();

// console.log(`message: ${msz}`);

// console.log(`encypted : ${hash}`);