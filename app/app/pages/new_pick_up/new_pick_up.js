var view = require("ui/core/view");
var Observable = require('data/observable').Observable;
var FrameModule = require('ui/frame');
var TopFrame = require('ui/frame').topmost();

var GrandNavigator = require('./../../core/GrandNavigator');
var GApiModule = require('./../../core/GrandAPI'); 
var GDbModule = require('./../../core/GrandDB'); 
var GCustomHelpersModule = require('./../../core/GrandCustomHelpers');
var dialogs = require("tns-core-modules/ui/dialogs");

var VM = new Observable();



//ease functions
var loaderStatus = function(status) {
    if (status == 1) {
        VM.set("loadingStatus", true);
    } else {
        VM.set("loadingStatus", false);
    }
};

var getDateTimeRelatedSearch = function(opt){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    switch(opt){
        case "hour" : return today.getHours();break;
        case "minute" : return today.getMinutes();break;
        case "day" : return dd;break;
        case "month" : return mm;break;
        case "year" : return yyyy;break;
        default: return "";
            break; 
    }
};



exports.onLoaded = function(args) {
    var page = args.object;
    
    //
    var min = getDateTimeRelatedSearch('minute') < 10 ? '0' + getDateTimeRelatedSearch('minute') : getDateTimeRelatedSearch('minute');//append 0
    //VM.set("pickUpObj",GDbModule.getThisUser());
    VM.set("sch_date","");
    VM.set("product_description","");
    VM.set("estimated_weight","");
    VM.set("product_type","");
    VM.set("product_qty",1);
    VM.set("sch_time",getDateTimeRelatedSearch('hour') + ":" + min);
    VM.set("pickup_date",{
        day : getDateTimeRelatedSearch('day'),month:getDateTimeRelatedSearch('month'),year:getDateTimeRelatedSearch('year')
    });
    VM.set("pickup_time",{
        hour : '01',minute:'01'
    });
    
    VM.pickProductType = function(){
        dialogs.action({
            message: "Chagua Aina ya mzigo",
            cancelButtonText: "Cancel",
            actions: ["LETTER/BARUA","DOCUMENT","BOX","OTHER"]
        }).then(function (result) {
            console.log("Dialog result: " + result);
            if(result == "Cancel"){
                VM.set("product_type","");
            }else{
                VM.set("product_type",result);
            }
        });
    };

    VM.processForm = function(){
        VM.set("sch_date",VM.pickup_date.year + "-" + VM.pickup_date.month + "-" + VM.pickup_date.day);
        if(VM.sch_date == "" || VM.product_type == ""){
            GCustomHelpersModule.getSimpleAlert("Form Error", "Hakikisha tarehe na aina ya mzigo zimejazwa sahihi!");
            return;
        }
        var obj = {
            sch_date : VM.sch_date,
            product_description : VM.product_description,
            estimated_weight : VM.estimated_weight,
            product_qty : VM.product_qty,
            product_type : VM.product_type,
            sch_time : VM.sch_time
        };
        //console.log(JSON.stringify(obj));
        GrandNavigator.goSetPickUpForm2(obj);
    };
    

    VM.goBack = function(){
        FrameModule.topmost().goBack();
    };
    //

    


    page.bindingContext = VM;
};
 