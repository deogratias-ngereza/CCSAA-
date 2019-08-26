var Observable = require("data/observable").Observable;
var GrandNavigator = require('./../../core/GrandNavigator');
//const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
//const fromObject = require("data/observable").fromObject;


var PAGE = undefined; 


exports.VM = function(){
    var VM = new Observable();
    VM.loadingStatus = false;
    VM.currentUserObj = {};

    VM.goLogin = function(){
        GrandNavigator.goLogin();
    };
    VM.imports = [
        {product: "PARCEL",suppulier:"Grand Master","status":-1},
        {product: "PARCEL",suppulier:"Grand Master","status":0},
        {product: "PARCEL",suppulier:"Grand Master","status":1},
        {product: "PARCEL",suppulier:"Grand Master","status":1},
        {product: "PARCEL",suppulier:"Grand Master","status":-1},
        {product: "PARCEL",suppulier:"Grand Master","status":1},
        {product: "PARCEL",suppulier:"Grand Master","status":1},
        {product: "PARCEL",suppulier:"Grand Master","status":-1},
        {product: "PARCEL",suppulier:"Grand Master","status":1},
        {product: "PARCEL",suppulier:"Grand Master","status":0},
        {product: "PARCEL",suppulier:"Grand Master","status":1},
        {product: "PARCEL",suppulier:"Grand Master","status":-1}
    ];
    VM.goToNewImport = function(){
        GrandNavigator.goNewImport();
    };

    return VM;
};
