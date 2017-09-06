/*
 * Simple node test code for rackhd
 */

'use strict';
/*jshint esversion: 6 */

var Promise = require('bluebird');

var PromiseCall = function() {

    //this.chainFunc = function() {
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
        if (fun) {
            fun();
        }
    };

    this.allFunc = function() {
        console.log("====================>allFunc...");
        var parallelOne = function() {
            return Promise.resolve()
                .then(function() {
                    console.log("One");
                });
        };
        var parallelTwo = function() {
            return Promise.resolve()
                .then(function() {
                    console.log("Two");
                    return Promise.resolve()
                        .then(function() {
                            return "Four";
                        });
                })
                .then(function(data) {
                    console.log(data);
                });
        };
        var parallelThree = function() {
            return Promise.resolve()
                .then(function() {
                    console.log("Three");
                });
        };

        Promise.all([parallelOne(), parallelTwo(), parallelThree()])
            .then(function() {
                console.log("finished.");
            });
        console.log("<===================");
    };

    this.anyAndSomeFunc = function() {
        console.log("====================>anyAndSomeFunc...");
        var parallelOne = function() {
            return Promise.resolve()
                .then(function() {
                    console.log("One");
                    return "One";
                });
        };
        var parallelTwo = function() {
            return Promise.resolve()
                .then(function() {
                    console.log("Two");
                    return "Two";
                });
        };
        var parallelThree = function() {
            return Promise.resolve()
                .then(function() {
                    console.log("Three");
                    return "Three";
                });
        };

        Promise.any([parallelOne(), parallelTwo(), parallelThree()])
            // Promise.some([parallelOne(), parallelTwo(), parallelThree()], 2)
            .then(function(result) {
                console.log(result);
                console.log("finished.");
            });
        console.log("<===================");
    };

    this.eachFunc = function() {
        console.log("====================>eachFunc...");

        var arrayInPromiseSample = function() {
            return Promise.resolve()
                .then(function() {
                    return [1, 2, 3, 4, 5, 6];
                });
        };

        Promise.each(arrayInPromiseSample(), function(item, index, length) {
            console.log(`item is ${item}, index is ${index}, length is ${length}`);
        });

        Promise.each(['a', 'b', 'c', 'd', 'e'], function(item, index, length) {
            console.log(`item is ${item}, index is ${index}, length is ${length}`);
        });
        console.log("<===================");
    };

    this.mapReduceFunc = function() {
        console.log("====================>mapReduceFunc...");

        var promiseInArraySample = function() {
            var promise1 = Promise.resolve().then(function() {
                return {
                    "prop1": 11,
                    "prop2": 12,
                    "prop3": "abcdefg",
                    "prop4": true
                };
            });

            var promise2 = Promise.resolve().then(function() {
                return {
                    "prop1": 21,
                    "prop2": 22,
                    "prop3": "hijklmn",
                    "prop4": false
                };
            });

            var promise3 = Promise.resolve().then(function() {
                return {
                    "prop1": 31,
                    "prop2": 32,
                    "prop3": "opqrstu",
                    "prop4": true
                };
            });

            return [promise1, promise2, promise3];
        };

        Promise.all(promiseInArraySample()).map(function(item) {
                return item.prop3;
            })
            .reduce(function(accumulator, item) {
                return accumulator + item;
            })
            .then(function(result) {
                console.log(`reduce result is \"${result}\"`);
            });

        Promise.all(promiseInArraySample()).filter(function(item) {
            return item.prop4;
        }).each(function(item) {
            console.log(item);
        });

        console.log("<===================");
    };
};

var obj = new PromiseCall();
// obj.chainFunc();
obj.chainFunc(obj.chainFunc);
// obj.allFunc();
// obj.anyAndSomeFunc();
// obj.eachFunc();
// obj.mapReduceFunc();
