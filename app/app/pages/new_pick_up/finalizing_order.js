var view = require("ui/core/view");
var Observable = require('data/observable').Observable;
var observableArray = require("data/observable-array");
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


var PICKUP_DATA = undefined;
var PICKUP_ADDRESS_OBJ = undefined;
var DROP_ADDRESS_OBJ = undefined;

//ease functions
var loaderStatus = function(status) {
    if (status == 1) {
        VM.set("loadingStatus", true);
    } else {
        VM.set("loadingStatus", false);
    }
};

//set pickup anddrop location
var setLuggagePickDropLocation = function(){
    //pickup
    if(PICKUP_ADDRESS_OBJ == undefined){
        PICKUP_ADDRESS_OBJ = GDbModule.getThisPickUpPoint();
        VM.set("pickUpObj",PICKUP_ADDRESS_OBJ);
    }else{
        VM.set("pickUpObj",PICKUP_ADDRESS_OBJ);
    }
    //drop
    if(DROP_ADDRESS_OBJ == undefined){
        DROP_ADDRESS_OBJ = GDbModule.getThisDeliverypPoint();
        VM.set("dropLocObj",DROP_ADDRESS_OBJ);
    }else{
        VM.set("dropLocObj",DROP_ADDRESS_OBJ);
    }
    //luggage
    if(PICKUP_DATA == undefined){
        PICKUP_DATA = {"sch_date":"0000-00-00","product_description":"","estimated_weight":"","product_qty":0,"product_type":"UNKNOWN","sch_time":"00:00"}
        ;
        VM.set("luggageObj",PICKUP_DATA);
    }else{
        VM.set("luggageObj",PICKUP_DATA);
    }
};



 
exports.onLoaded = function(args) {
    var page = args.object;
    var CURRENT_USER = GDbModule.getThisUser();
    setLuggagePickDropLocation();

    VM.cancelOrder = function(){
        var diagRes = dialogs.confirm("Are you sure you want to cancel your order?");
        diagRes.then(function(res){
            if(res){
                GrandNavigator.goHome();
            }
        });
    };

    VM.confirmOrder = function(){ 
        var dt = {
            awb_ref : GCustomHelpersModule.getRandomLowerCaseAplhaNumericKey(4) + "-"+GCustomHelpersModule.getRandomLowerCaseAplhaNumericKey(4) + "-"+GCustomHelpersModule.getRandomLowerCaseAplhaNumericKey(4),
            
            customer_id : CURRENT_USER.id,
            sch_date : PICKUP_DATA.sch_date,
            product_type :  PICKUP_DATA.product_type,
            product_qty :  PICKUP_DATA.product_qty,
            description :  PICKUP_DATA.product_description,
            product_est_weight : PICKUP_DATA.estimated_weight,
            status : 'ORDER',

            pickup_country_id : PICKUP_ADDRESS_OBJ.country_obj.id,
            pickup_region_id : PICKUP_ADDRESS_OBJ.region_obj.id,
            pickup_district_id : PICKUP_ADDRESS_OBJ.district_obj.id,
            pickup_location_id : PICKUP_ADDRESS_OBJ.covered_area_obj.id,
            pickup_address : PICKUP_ADDRESS_OBJ.specific_area,
            pickup_phone : PICKUP_ADDRESS_OBJ.phone,
            sender : PICKUP_ADDRESS_OBJ.name,

            delivery_to : DROP_ADDRESS_OBJ.name,
            delivery_country_id : DROP_ADDRESS_OBJ.country_obj.id,
            delivery_region_id : DROP_ADDRESS_OBJ.region_obj.id,
            delivery_district_id : DROP_ADDRESS_OBJ.district_obj.id,
            delivery_location_id : DROP_ADDRESS_OBJ.covered_area_obj.id,
            delivery_address : DROP_ADDRESS_OBJ.specific_area,
            delivery_phone : DROP_ADDRESS_OBJ.phone
        };
       // console.log("[ORDER]:::" + JSON.stringify(dt));

        //
         //now u can send the value to the server 
         loaderStatus(1);
         var conn = GApiModule.grand_basic_post("pickup_request_insert",dt);
         conn.then((res) => {
              loaderStatus(0);
              var contentOBJ = JSON.parse(res.content);
              console.log("[ CODE ] " + res.statusCode);
              if (res.statusCode == 200) {
                 
                  GCustomHelpersModule.getSimpleLongToast("Asante,tunashughulikia maombi yako.");
                  GrandNavigator.goHome();
              } else if(res.statusCode == 401){
                  GCustomHelpersModule.getSimpleAlert("Error", "Form si sahihi");//contentOBJ.msg_data
              }else{
                  GCustomHelpersModule.getSimpleAlert("Error", "Form si sahihi");
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







exports.onNavigatingTo = function(args){
    var page = args.object;
    PICKUP_DATA = page.navigationContext.PICKUP_DATA;
    PICKUP_ADDRESS_OBJ = page.navigationContext.PICK_ADDRESS_OBJ;
    DROP_ADDRESS_OBJ = page.navigationContext.DROP_ADDRESS_OBJ;

   // console.log("[FROM step1]::PICKUP-DATA ::" +JSON.stringify(PICKUP_DATA));
   // console.log("[FROM step2]::PICKUP_ADDRESS_OBJ ::" +JSON.stringify(PICKUP_ADDRESS_OBJ));
   // console.log("[FROM step3]::DROP_ADDRESS_OBJ ::" +JSON.stringify(DROP_ADDRESS_OBJ));
};
exports.onNavigatedTo = function(args){
    var page = args.object;
    PICKUP_DATA = page.navigationContext.PICKUP_DATA;
    PICKUP_ADDRESS_OBJ = page.navigationContext.PICK_ADDRESS_OBJ;
    DROP_ADDRESS_OBJ = page.navigationContext.DROP_ADDRESS_OBJ;
};

//navigatedTo="onNavigatedTo" navigatingTo="onNavigatingTo"

