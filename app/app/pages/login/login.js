var GrandNavigator = require('./../../core/GrandNavigator');
var GCustomHelpersModule = require("./../../core/GrandCustomHelpers");
var GApiModule = require("./../../core/GrandAPI");
var GDbModule = require("./../../core/GrandDB");
var VM = require('./login-vm.js').VM();
VM.set("showResendOtpStatus",false);

//
exports.onLoaded = function(args) {
    var page = args.object;
    page.bindingContext = VM;

    

    var otpReceivingModeOn = GDbModule.getCurrentOTPReceivingMode();
    var otpRecCustID = GDbModule.getCurrentOTPRecCustID();
    

    //check if is in OTP receiving mode on
    if(otpRecCustID != undefined){
       // 
       VM.set("showResendOtpStatus",true);
        return;
    }
    loaderStatus(1);

    var userObj = GDbModule.getThisUser();
    /**if already logged in */
    if(userObj != undefined){
        GCustomHelpersModule.getSimpleShortToast("Karibu " + userObj.first_name);
        setTimeout(() => {
            loaderStatus(0);
            GrandNavigator.goHome();
        }, 2000);
    }else{
        setTimeout(() => {
            loaderStatus(0);
        }, 3000);
    }


    VM.goResendOTP = function(){
        GrandNavigator.goReceiveRegOTP();
    };


    

    
};


exports.onNavigatedTo = function(args) {
    
};
exports.onNavigatingTo = function(args) {
    
};



exports.goSignUpPage = function(){
    GrandNavigator.goSignup();
   // alert("dignup"); 
};
exports.goRecoverPage = function(){
    GrandNavigator.goRecover();
};


 

//ease functions
var loaderStatus = function(status) {
    if (status == 1) {
        VM.set("loadingStatus", true);
    } else {
        VM.set("loadingStatus", false);
    }
};

var get_countries_map_n_go_home = function(){
    loaderStatus(1);
    console.log("[GET COUNTRIES MAP]");
    var conn = GApiModule.grand_basic_get("get_countries_map", {});
    conn.then((res) => {
        loaderStatus(0); 
        var contentOBJ = JSON.parse(res.content);
        if (res.statusCode == 200) {
            //save countries map 
            alert("fine");
            console.log("[DATA] => " + JSON.stringify(contentOBJ.msg_data));
            GDbModule.saveCurrentCountriesMap(contentOBJ.msg_data);
            alert("ok");
            GrandNavigator.goHome();
            alert("okk");
        } else {alert("err");
            //GCustomHelpersModule.getSimpleLongToast("Invalid credentials!!");
        }
    }, (error) => {
        loaderStatus(0);
        GCustomHelpersModule.getSimpleLongToast("Please restart the app");
        console.log("[ ERROR ] " + error);
    });
};

exports.login = function(){
    loaderStatus(1);

    //alert("" + JSON.stringify(VM.userLoginObj));

    //console.log("[ HEYYY ]"+ JSON.stringify(VM.userLoginObj));
    //alert(VM.userLoginObj.phone_no + VM.userLoginObj.password);
    //return;
    //var conn = GApiModule.grand_basic_post("post_login", VM.userLoginObj);
    var conn = GApiModule.grand_basic_post("post_login", {phone_no : VM.userLoginObj.phone_no,password:VM.userLoginObj.password});
    conn.then((res) => {
        loaderStatus(0); 
        var contentOBJ = JSON.parse(res.content);

        //console.log("==>" + JSON.stringify(contentOBJ));

        if (res.statusCode == 200) {
            //save the user and the token
            GDbModule.saveThisUser(contentOBJ.msg_data.user);
            GDbModule.saveThisUserToken(contentOBJ.msg_data.token);
            //redirect user to the main app.
            GCustomHelpersModule.getSimpleShortToast("You may continue");
            GrandNavigator.goHome();
           //get_countries_map_n_go_home();
        } else {
            //GCustomHelpersModule.getSimpleLongToast("Invalid credentials!!");
            GCustomHelpersModule.getSimpleAlert("Login Error", contentOBJ.msg_data);
        }
    }, (error) => {
        loaderStatus(0);
        console.log("[ ERROR ] " + error);
        GCustomHelpersModule.getSimpleAlert("Server Error", "Sorry server is down for sometimes!");
        //custom redirect to error page
    });
};