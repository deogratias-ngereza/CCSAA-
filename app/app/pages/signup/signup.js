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





exports.onLoaded = function(args) {
    var page = args.object; 
    page.backgroundColor = GCustomHelpersModule.getBaseColor();//background color; 
    
    VM.set("loadingStatus",false);
    VM.set("signUpObj",{ 
       // "first_name" : "","last_name":"","email":"","phone_no":"","password":"","password2":"","address":""
       "first_name" : "Test","last_name":"Test","email":"grand123grand1@gmail.com","phone_no":"0688059688","password":"password","password2":"password","address":"Test"
      // "first_name" : "","last_name":"","email":"","phone_no":"","password":"","password2":"","address":""
    });

    VM.goBack = function(){
        FrameModule.topmost().goBack();
    };
    VM.goVerifyOTPPage = function(){
        GrandNavigator.goVerifyOTP();
    };
    VM.goLoginPage = function(){alert('login')
        GrandNavigator.goLogin();
    };

    VM.signup = function(){
        //console.log("[ SIGNUP DATA ]" + JSON.stringify(VM.get("signUpObj")));
        //GrandNavigator.goReceiveRegOTP();

        if(VM.signUpObj.first_name == "" || VM.signUpObj.last_name == "" || VM.signUpObj.password == ""){
            GCustomHelpersModule.getSimpleAlert("Invalid Form Inputs", "Hakiki fomu yako!");
            return;
        }
        else if(VM.signUpObj.password != VM.signUpObj.password2){
            GCustomHelpersModule.getSimpleAlert("Password Mismatch!", "Namba za siri haziko sawa sawa!!");
            return;
        }else if(VM.signUpObj.phone_no == "" || VM.signUpObj.phone_no.length != 10){
            GCustomHelpersModule.getSimpleAlert("Invalid Phone no!", "Namba ya simu si sahihi!");
            return;
        }
        else{
            //
            //push request to the server
            //GDbModule.saveCurrentOTPReceivingMode(true);

            loaderStatus(1);
            var conn = GApiModule.grand_basic_post("post_register",VM.signUpObj);
            conn.then((res) => {
                 
                
                loaderStatus(0);
                var contentOBJ = JSON.parse(res.content);
                //var contentOBJ = res.content;
                console.log("=>Code " + res.statusCode);
                
                //console.log("==>" + contentOBJ);

                if (res.statusCode == 200) {
                    //save the user and the token
                    //GDbModule.saveThisUser(contentOBJ.msg_data.user);
                    //GDbModule.saveThisUserToken(contentOBJ.msg_data.token);
                    //redirect user to the main app.
                    GDbModule.saveCurrentOTPRecCustID(contentOBJ.msg_data.customer_id);
                    GCustomHelpersModule.getSimpleLongToast("Asante,Subiri ujumbe mfupi(sms/email) kisha ingiza namba ya OTP iliyotumwa.");
                    GrandNavigator.goReceiveRegOTP(); 

                } else if(res.statusCode == 400){
                    //GCustomHelpersModule.getSimpleLongToast("Invalid credentials!!");
                    GCustomHelpersModule.getSimpleAlert("Signup Error", contentOBJ.msg);
                }else{
                    GCustomHelpersModule.getSimpleAlert("Signup Error", contentOBJ.msg_data);
                }
            }, (error) => {
                loaderStatus(0);
                console.log("[ ERROR ] " + error);
                GCustomHelpersModule.getSimpleAlert("Server Error", "Sorry server is down for sometimes!");
                //custom redirect to error page
            });



        }
    };


    page.bindingContext = VM;
};
