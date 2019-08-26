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


var MANIFEST_DATA = {};


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


    loaderStatus(1);
    VM.set("userOBJ",GDbModule.getThisUser());
    VM.set("HISTORY_DATA",[]);

    //console.log("[DATA ]" + JSON.stringify(MANIFEST_DATA));

    var CURRENT_USER = GDbModule.getThisUser();
    VM.getAllManifest = function(){
        loaderStatus(1);
        var conn = GApiModule.grand_basic_get("get_all_history_for_manifest_cust",{id : VM.userOBJ.id});console.log("[user]" + JSON.stringify(VM.userOBJ));
        conn.then((res) => {
            loaderStatus(0);console.log("[res]" + JSON.stringify(res));
            var contentOBJ = JSON.parse(res.content);
            console.log("[ CODE ] " + res.statusCode);
            if (res.statusCode == 200) { 
                VM.set("HISTORY_DATA",contentOBJ.msg_data.history); 
                //VM.set("MANIFEST_DATA",contentOBJ.msg_data.manifest); 
            } else if(res.statusCode == 401){
                GCustomHelpersModule.getSimpleAlert("Error", contentOBJ.msg_data);
            }else{
                GCustomHelpersModule.getSimpleAlert("Error", "Something went wrong!");
            } 
        }, (error) => {
            loaderStatus(0);
            console.log("[ ERROR ] " + error);
            GCustomHelpersModule.getSimpleAlert("Server Error", "Sorry server is down for sometimes!");
            //custom redirect to error page 
        });
    };

    VM.reqDelivery = function(){
       // GrandNavigator.goSetDeliveryRequest(MANIFEST_DATA);
    };

    VM.goBack = function(){
        FrameModule.topmost().goBack();
    };



    setTimeout(() => {
        VM.getAllManifest();//init
    }, 500);


    
   


    page.bindingContext = VM;
};






//navigatedTo="onNavigatedTo" navigatingTo="onNavigatingTo"

