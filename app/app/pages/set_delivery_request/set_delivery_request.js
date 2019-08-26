var view = require("ui/core/view");
var Observable = require('data/observable').Observable;
var FrameModule = require('ui/frame');
var TopFrame = require('ui/frame').topmost();
var GrandNavigator = require('./../../core/GrandNavigator');
var GCustomHelpersModule = require('./../../core/GrandCustomHelpers');
var GApiModule = require("./../../core/GrandAPI");
var GDbModule = require('./../../core/GrandDB'); 
var nsDrawer;
var VM = new Observable();
const fromObject = require("data/observable").fromObject;
var dialogs = require("tns-core-modules/ui/dialogs");


var OPTION = "PICK_UP";


//ease functions
var loaderStatus = function(status) {
    if (status == 1) {
        VM.set("loadingStatus", true);
    } else {
        VM.set("loadingStatus", false);
    }
};
 


var setDefault = function(){
    var PickUpObj = GDbModule.getThisDeliverypPoint();
    if(PickUpObj != undefined){
        VM.set("region",PickUpObj.region);
        VM.set("district",PickUpObj.district);
        VM.set("phone",PickUpObj.phone);
        VM.set("location",PickUpObj.location);
    }
};



exports.onLoaded = function(args) {
    var page = args.object;

    var CURRENT_USER = GDbModule.getThisUser();
    
    VM.set("region","");
    VM.set("district","");
    VM.set("phone",""); 
    VM.set("location","");
    VM.set("loadingStatus",false);
    setDefault();



    VM.pickRegion = function(){
        dialogs.action({
            message: "Chagua Mkoa", 
            cancelButtonText: "Cancel",
            actions: GCustomHelpersModule.getRegionsArray()
        }).then(function (result) {
            console.log("Dialog result: " + result);
            if(result == "Cancel"){
                VM.set("region","");
            }else{
                VM.set("region",result);
            }
        });
    };

    VM.applyRequest = function(){
        GCustomHelpersModule.getSimpleShortToast("Asante, tunashughulikia maombi yako.");
        GrandNavigator.goHome();
    };



    page.bindingContext = VM;
};





exports.onNavigatingTo = function(args){
    var page = args.object;
    OPTION = page.navigationContext.OPTION;
};
exports.onNavigatedTo = function(args){
    var page = args.object;
    OPTION = page.navigationContext.OPTION;
};

//navigatedTo="onNavigatedTo" navigatingTo="onNavigatingTo"

