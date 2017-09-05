/*
 * Simple node test code for rackhd
 */

'use strict';

var _ = require('lodash'),
    Promise = require('bluebird');

var promiseCall = function() {
    /* chainFunc */
    this.chainFunc = function(fun) {
        console.log("=====================>chainFunc...");
        var counter = 0;
        console.log(counter);
        counter += 1;
        Promise.resolve()
            .then(function() {
                console.log(counter);
                counter += 1;
                return counter;
            })
            .then(function(data) {
                console.log(data);
                data += 1;
                return data;
            })
            .then(function(data) {
                console.log(data);
                return data;
            });
        console.log("<====================");
        // if(fun){
        //     fun();
        // }
    };

    this.allFunc = function() {
        console.log("====================>allFunc...");
        var parallelOne = function() {
            return Promise.resolve()
                .then(function() {
                    return "One";
                });
        };
        var parallelTwo = function() {
            return Promise.resolve()
                .then(function() {
                    return "Two";
                });
        };
        var parallelThree = function() {
            return Promise.resolve()
                .then(function() {
                    return "Three";
                });
        };

        Promise.all([parallelOne, parallelTwo, parallelThree])
            .spread(function(resultOne, resultTwo, resultThree) {
                console.log(resultOne());
                console.log(resultTwo);
                console.log(resultThree);
            });
        console.log("<===================");
    };
};

var obj = new promiseCall();
// obj.chainFunc();
obj.allFunc();
// obj.chainFunc(obj.chainFunc);
