var Observable = require("data/observable").Observable;
//const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const fromObject = require("data/observable").fromObject;


var PAGE = undefined; 


exports.VM = function(){
    var VM = new Observable();
    VM.loadingStatus = false;

    return VM;
};


