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
    
    VM.set("loadingStatus",false);
    VM.set("OTPObj",{
        "otp_type" : "REGISTRATION","customer_id": GDbModule.getCurrentOTPRecCustID(),"otp":""
    });

    VM.goBack = function(){
        FrameModule.topmost().goBack();
    };
   
    VM.validate = function(){
        if(VM.OTPObj.otp.length != 4){
            GCustomHelpersModule.getSimpleAlert("Error", "OTP si sahihi!");
            return;
        }
        loaderStatus(1);
        var conn = GApiModule.grand_basic_post("post_validate_otp_reg",VM.OTPObj);
        conn.then((res) => {
            loaderStatus(0);
            var contentOBJ = JSON.parse(res.content);
            console.log("[ CODE ] " + res.statusCode);
            if (res.statusCode == 200) {
                //remove currentRecCustID
                GDbModule.removeCurrentOTPRecCustID();
                GDbModule.saveCurrentOTPReceivingMode(false);
                //save the user and the token
                GDbModule.saveThisUser(contentOBJ.msg_data.user);
                GDbModule.saveThisUserToken(contentOBJ.msg_data.token);
                //redirect user to the main app.
                GCustomHelpersModule.getSimpleShortToast("Uhakiki umefanikiwa.");
                GrandNavigator.goHome();
            } else if(res.statusCode == 401){
                GCustomHelpersModule.getSimpleAlert("OTP Error", contentOBJ.msg_data);
            }else{
                GCustomHelpersModule.getSimpleAlert("OTP Error", contentOBJ.msg_data);
            }
        }, (error) => {
            loaderStatus(0);
            console.log("[ ERROR ] " + error);
            GCustomHelpersModule.getSimpleAlert("Server Error", "Sorry server is down for sometimes!");
            //custom redirect to error page
        });
    };



    VM.resendOTP = function(){
        loaderStatus(1);
        var conn = GApiModule.grand_basic_post("resend_reg_otp",VM.OTPObj);
        conn.then((res) => {
            loaderStatus(0);
            var contentOBJ = JSON.parse(res.content);
            console.log("[ CODE ] " + res.statusCode);
            if (res.statusCode == 200) {
                GCustomHelpersModule.getSimpleLongToast("Subiri kidogo,Ujumbe mfupi utatumwa kwenye simu yako");
            } else if(res.statusCode == 401){
                GCustomHelpersModule.getSimpleAlert("OTP Error", contentOBJ.msg_data);
            }else{
                GCustomHelpersModule.getSimpleAlert("OTP Error", contentOBJ.msg_data);
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
