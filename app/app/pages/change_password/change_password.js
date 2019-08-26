var view = require("ui/core/view");
var GrandNavigator = require('./../../core/GrandNavigator');
var GApiModule = require('./../../core/GrandAPI'); 
var GDbModule = require('./../../core/GrandDB'); 
var GCustomHelpersModule = require('./../../core/GrandCustomHelpers');
var Observable = require("data/observable").Observable;
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const fromObject = require("data/observable").fromObject;

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



//

exports.onLoaded = function(args) {
    var page = args.object;
    var CURRENT_USER = GDbModule.getThisUser();
    
    VM.set("loadingStatus",false);
    VM.set("userObj",{
        "old_password" : "","new_password": "","customer_id" : CURRENT_USER.id
    });

    VM.goBack = function(){
        FrameModule.topmost().goBack();
    };


    VM.changePassword = function(){ 
        loaderStatus(1);
        console.log("[ G ] " + JSON.stringify(VM.userObj));
        var conn = GApiModule.grand_basic_post("reset_password",VM.userObj);
        conn.then((res) => {
            loaderStatus(0);
            var contentOBJ = JSON.parse(res.content);
            console.log("[ CODE ] " + res.statusCode);
            if (res.statusCode == 200) {
                GCustomHelpersModule.getSimpleLongToast("Hongera, umeweza kubadili namba yako ya siri.");
                GrandNavigator.goHome();
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



    VM.xrequestNewPassword = function(){
        if(VM.userObj.phone_no.length != 10){
            GCustomHelpersModule.getSimpleAlert("Phone Error", "Namba ya simu si sahihi!");
            return;
        }
        loaderStatus(1);
        var conn = GApiModule.grand_basic_post("request_password_recovery",VM.userObj);
        conn.then((res) => {
            loaderStatus(0);
            var contentOBJ = JSON.parse(res.content);
            console.log("[ CODE ] " + res.statusCode);
            if (res.statusCode == 200) {
                GCustomHelpersModule.getSimpleLongToast("Subiri kidogo,Ujumbe mfupi utatumwa kwenye simu yako");
                GrandNavigator.goLogin();
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



    VM.goLogin = function(){
        GrandNavigator.goLogin();
    };


    page.bindingContext = VM;
};
