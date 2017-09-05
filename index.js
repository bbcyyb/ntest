/*
 * Simple node test code for rackhd
 */

'use strict';

var _ = require('lodash'),
    Promise = require('bluebird'),
    di = require('di');

console.log("hello world");

Promise.resolve()
    .then(function() {
        console.log("11111");
        return "22222"
    })
.then(function(data) {
    console.log(data);
    return '33333';
})
.then(function(data) {
    console.log(data);
    return '444444';
});

console.log("bye world");
