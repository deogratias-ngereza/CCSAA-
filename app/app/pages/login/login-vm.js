var Observable = require("data/observable").Observable;
//const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const fromObject = require("data/observable").fromObject;
var GrandNavigator = require('./../../core/GrandNavigator');


var PAGE = undefined; 


exports.VM = function(){
    var VM = new Observable();
    VM.loadingStatus = false;
    VM.userLoginObj = fromObject({
        phone_no : "",password:"" 
    });

    VM.lxogin = function(){ 
        VM.set("loadingStatus",true);
        alert("login : " + VM.userLoginObj.email); 
    };

    return VM;
};


