var view = require("ui/core/view");
var Observable = require('data/observable').Observable;
var FrameModule = require('ui/frame');
var TopFrame = require('ui/frame').topmost();

var GrandNavigator = require('./../../core/GrandNavigator');
var GApiModule = require('./../../core/GrandAPI'); 
var GDbModule = require('./../../core/GrandDB'); 
var GCustomHelpersModule = require('./../../core/GrandCustomHelpers');


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
    loaderStatus(1);

  

    VM.set("PickupsList",[
        /*{"item_name":"ITEM","status":"ON_TRANSIT","first_name":"Grand","last_name":"Master"},
        {"item_name":"ITEM","status":"RECEIVED_BY_AGENT","first_name":"Grand","last_name":"Master"},
        {"item_name":"ITEM","status":"RECEIVED","first_name":"Grand","last_name":"Master"},
        {"item_name":"ITEM","status":"PROCESSING","first_name":"Grand","last_name":"Master"},
        {"item_name":"ITEM","status":"RETURNED","first_name":"Grand","last_name":"Master"},
        {"item_name":"ITEM","status":"ON_TRANSIT","first_name":"Grand","last_name":"Master"},
        {"item_name":"ITEM","status":"RECEIVED_BY_AGENT","first_name":"Grand","last_name":"Master"}*/
    ]);


    
    
    VM.set("userOBJ",GDbModule.getThisUser());
    //

    VM.getAllMyPickups = function(){
        loaderStatus(1);
        var conn = GApiModule.grand_basic_get("pickup_requests_for_customer",{id : VM.userOBJ.id});console.log("[user]" + JSON.stringify(VM.userOBJ));
        conn.then((res) => {
            loaderStatus(0);
            var contentOBJ = JSON.parse(res.content);
            console.log("[ CODE ] " + res.statusCode);
            if (res.statusCode == 200) {
                VM.set("PickupsList",contentOBJ.msg_data);
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
    
    

    VM.goBack = function(){
        FrameModule.topmost().goBack();
    };
    VM.goPickUp = function(){
        GrandNavigator.goNewNewPickUp();
    };
    //

    setTimeout(() => {
        VM.getAllMyPickups();//init
    }, 500);
     


    page.bindingContext = VM;
};
 