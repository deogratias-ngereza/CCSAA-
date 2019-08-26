var view = require("ui/core/view");
var GCustomHelpersModule = require('./../../core/GrandCustomHelpers');
var GrandNavigator = require('./../../core/GrandNavigator');
var GDbModule = require('./../../core/GrandDB'); 
var Observable = require("data/observable").Observable;

var FrameModule = require('ui/frame');
var TopFrame = require('ui/frame').topmost();
var VM = new Observable();


//ease functions
var loaderStatus = function(status) {
    if (status == 1) {
        VM.set("loadingStatus", true);
    } else {
        VM.set("loadingStatus", false);
    }
};





exports.onLoaded = function(args) {
    var page = args.object;
    var actionBar = page.getViewById("actionBar");
    actionBar.backgroundColor = GCustomHelpersModule.getBaseColor();//background color; 


    
    VM.set("loadingStatus",false);
    VM.set("PickUpObj",GDbModule.getThisPickUpPoint());
    VM.set("DeliveryObj",GDbModule.getThisDeliverypPoint());

    VM.goBack = function(){
        FrameModule.topmost().goBack();
    };

    VM.goSetPickPoint = function(){
        GrandNavigator.goPickOrDelSet("PICK_UP");
    };
    VM.goSetDeliveryPoint = function(){
        GrandNavigator.goPickOrDelSet("DELIVERY");
    };


    page.bindingContext = VM;
};
