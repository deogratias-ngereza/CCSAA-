var Observable = require("data/observable").Observable;
var GrandNavigator = require('./../../core/GrandNavigator');
var GrandAuth = require('./../../core/GrandAuth');
//const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
//const fromObject = require("data/observable").fromObject;


var PAGE = undefined; 


exports.VM = function(){
    var VM = new Observable();
    VM.loadingStatus = false;
    VM.currentUserObj = {};

    VM.goToImports = function(){
        GrandNavigator.goImportsList();
    };
    VM.goToDeliveries = function(){
        GrandNavigator.goDeliveriesList();
    };
    VM.goLogin = function(){
        GrandNavigator.goLogin();
    };
    VM.goTrack = function(){
        GrandNavigator.goTrack();
    };
    VM.logout = function(){
        GrandAuth.logout();
        GrandNavigator.goLogin();
    };
    return VM;
};
