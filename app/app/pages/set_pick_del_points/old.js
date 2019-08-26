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


var OPTION = "PICK_UP";
var CURRENT_COUNTRIES = new observableArray.ObservableArray();
var CURRENT_REGIONS = new observableArray.ObservableArray();
var CURRENT_DISTRICTS = new observableArray.ObservableArray();
var CURRENT_COVERED_AREAS = new observableArray.ObservableArray();

var SELECTED_COUNTRY = null;

//ease functions
var loaderStatus = function(status) {
    if (status == 1) {
        VM.set("loadingStatus", true);
    } else {
        VM.set("loadingStatus", false);
    }
};



var get_countries_map = function(){
    loaderStatus(1);
    console.log("[GET COUNTRIES MAP]");
    var conn = GApiModule.grand_basic_get("get_countries_map", {});
    conn.then((res) => {
        loaderStatus(0); 
        var contentOBJ = JSON.parse(res.content);
        if (res.statusCode == 200) {
            //save countries map 
            console.log("[SUCCESS] : Data loaded");
            console.log("[DATA] => " + JSON.stringify(contentOBJ.msg_data));
            VM.set("COUNTRIES_MAP",contentOBJ.msg_data);
            for(var i =0;i< contentOBJ.msg_data.length;i++){
                CURRENT_COUNTRIES.push(contentOBJ.msg_data[i].name);
            }
            VM.set("CURRENT_COUNTRIES",CURRENT_COUNTRIES);
            GDbModule.saveCurrentCountriesMap(contentOBJ.msg_data);
        } else {alert("err");
            console.log("[ERROR] : Fail to load the data");
            //GCustomHelpersModule.getSimpleLongToast("Invalid credentials!!");
        }
    }, (error) => {
        loaderStatus(0); 
        GCustomHelpersModule.getSimpleLongToast("Please restart the app");
        console.log("[ ERROR ] " + error);
    });
};

/**country changed */
exports.countryDropDownSelectedIndexChanged = function($event){
    console.log("[COUNTRY CHANGED]");
    alert(JSON.stringify($event.newIndex));
    var country_index = $event.newIndex;
    
    //set regions for this country
    var countries_map = VM.get('COUNTRIES_MAP');
    CURRENT_REGIONS = [];
    for(var i = 0; i < countries_map[country_index].regions.length;i++){
        CURRENT_REGIONS.push(countries_map[country_index].regions[i].name);
    }
    VM.set("CURRENT_REGIONS",CURRENT_REGIONS);
    VM.set("SELECTED_COUNTRY",countries_map[country_index]);
};
/**regions changed */
exports.regionDropDownSelectedIndexChanged = function($event){
    console.log("[REGION CHANGED]");
    alert(JSON.stringify($event.newIndex));
    var region_index = $event.newIndex;

    console.log("[CURRENT COUNTRY] " + JSON.stringify(VM.get('SELECTED_COUNTRY')));
    
    //set regions for this country
    var countries_map = VM.get('COUNTRIES_MAP');
    CURRENT_DISTRICTS = [];
    for(var i = 0; i < countries_map[region_index].districts.length;i++){
        CURRENT_DISTRICTS.push(countries_map[region_index].districts[i].name);
    }
    VM.set("CURRENT_DISTRICTS",CURRENT_DISTRICTS);
    VM.set("SELECTED_REGION",countries_map[country_index]);
};




var setDefault = function(){
    var PickUpObj = GDbModule.getThisPickUpPoint();
    var DeliveryObj = GDbModule.getThisDeliverypPoint();
    if(OPTION == "PICK_UP" && PickUpObj != undefined){
        VM.set("region",PickUpObj.region);
        VM.set("district",PickUpObj.district);
        VM.set("phone",PickUpObj.phone);
        VM.set("location",PickUpObj.location);
    }else if(OPTION == "DELIVERY" && DeliveryObj != undefined){
        VM.set("region",DeliveryObj.region);
        VM.set("district",DeliveryObj.district);
        VM.set("phone",DeliveryObj.phone);
        VM.set("location",DeliveryObj.location);
    }else{}
};



exports.onLoaded = function(args) {
    var page = args.object;

    var CURRENT_USER = GDbModule.getThisUser();
    get_countries_map();//get countries list/regions/districts/covered_areas
    
    /*VM.set("region","");
    VM.set("district","");
    VM.set("phone","");
    VM.set("location","");
    VM.set("loadingStatus",false);*/

    page.bindingContext = VM;
};

exports.xxonLoaded = function(args) {
    var page = args.object;

    var CURRENT_USER = GDbModule.getThisUser();
    get_countries_map();//get countries list/regions/districts/covered_areas
    
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

    VM.applySet = function(){
        var obj = {
            "region" : VM.get("region"),
            "district" : VM.get("district"),
            "phone" : VM.get("phone"),
            "location" : VM.get("location"),
            "address_for" : OPTION,
            "customer_id" : CURRENT_USER.id
        };
        if(obj.region == "" || obj.district == "" || obj.phone == "" || obj.location == ""){
            GCustomHelpersModule.getSimpleAlert("Error", "Hakiki fomu yako!");
            return;
        }
        console.log("[::]" + JSON.stringify(obj));

        //now u can send the value to the server 
        loaderStatus(1);
        var conn = GApiModule.grand_basic_post("insert_customer_address",obj);
        conn.then((res) => {
            loaderStatus(0);
            var contentOBJ = JSON.parse(res.content);
            console.log("[ CODE ] " + res.statusCode);
            if (res.statusCode == 200) {
                if(OPTION == "PICK_UP"){
                    GDbModule.savePickUpPoint(obj);
                }else{
                    GDbModule.saveDeliveryPoint(obj);
                }
                GCustomHelpersModule.getSimpleShortToast("Hongera,Kumbukumbu zimehifadhiwa salama.");
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


    page.bindingContext = VM;
};





exports.onNavigatingTo = function(args){
    var page = args.object;
    OPTION = page.navigationContext.OPTION;
};
exports.onNavigatedTo = function(args){
    var page = args.object;
    OPTION = page.navigationContext.OPTION;
}; 
 
//navigatedTo="onNavigatedTo" navigatingTo="onNavigatingTo"

