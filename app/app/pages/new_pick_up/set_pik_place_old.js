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


var PICKUP_DATA = {};


//ease functions
var loaderStatus = function(status) {
    if (status == 1) {
        VM.set("loadingStatus", true);
    } else {
        VM.set("loadingStatus", false);
    }
};



var setDefault = function(){
    var PickUpObj = GDbModule.getThisPickUpPoint();
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
    get_countries_map();//get countries list/regions/districts/covered_areas
    page.bindingContext = VM;
};


exports.xxonLoaded = function(args) {
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

    VM.requestPickup =function(){

        var obj = {
            "region" : VM.get("region"),
            "district" : VM.get("district"),
            "phone" : VM.get("phone"),
            "location" : VM.get("location"),
            "customer_id" : CURRENT_USER.id,
            "vbox_id" : CURRENT_USER.vbox_id,
            //append new data from form1
            "sch_date" : PICKUP_DATA.sch_date,
            "product_description" : PICKUP_DATA.product_description,
            "estimated_weight" : PICKUP_DATA.estimated_weight,
            "product_qty" : PICKUP_DATA.product_qty,
            "product_type" : PICKUP_DATA.product_type,
            "sch_time" : PICKUP_DATA.sch_time
        };
        if(obj.region == "" || obj.district == "" || obj.phone == "" || obj.location == ""){
            GCustomHelpersModule.getSimpleAlert("Error", "Hakiki fomu yako!");
            return;
        }
        console.log('[ pick up data ] ' + JSON.stringify(obj));
        //
         //now u can send the value to the server 
        loaderStatus(1);
        var conn = GApiModule.grand_basic_post("pickup_request_insert",obj);
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
};
exports.onNavigatedTo = function(args){
    var page = args.object;
    PICKUP_DATA = page.navigationContext.PICKUP_DATA;
};

//navigatedTo="onNavigatedTo" navigatingTo="onNavigatingTo"

