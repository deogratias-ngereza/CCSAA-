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
    var actionBar = page.getViewById("actionBar");
    actionBar.backgroundColor = GCustomHelpersModule.getBaseColor();//background color; 


     
    
    VM.set("userOBJ",GDbModule.getThisUser());
    

    VM.goBack = function(){
        FrameModule.topmost().goBack();
    };
    //

    VM.update = function(){
        //now u can send the value to the server 
        loaderStatus(1);
        var conn = GApiModule.grand_basic_put("customer_update",VM.userOBJ);console.log("[user]" + JSON.stringify(VM.userOBJ));
        conn.then((res) => {
            loaderStatus(0);
            var contentOBJ = JSON.parse(res.content);
            console.log("[ CODE ] " + res.statusCode);
            if (res.statusCode == 200) {
                GDbModule.saveThisUser(VM.userOBJ);
            } else if(res.statusCode == 401){
                GCustomHelpersModule.getSimpleAlert("Error", contentOBJ.msg_data);
            }else{
                GCustomHelpersModule.getSimpleAlert("Error", contentOBJ.msg_data);
            }
        }, (error) => {
            loaderStatus(0);
            console.log("[ ERROR ] " + error);
            GCustomHelpersModule.getSimpleAlert("Server Error", "Sorry server is down for sometimes!");
            //custom redirect to error page
        });
    };

     


    page.bindingContext = VM;
};
 