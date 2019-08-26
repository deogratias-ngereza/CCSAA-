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

var CURRENT_COUNTRIES = new observableArray.ObservableArray();
var CURRENT_REGIONS = new observableArray.ObservableArray();
var CURRENT_DISTRICTS = new observableArray.ObservableArray();
var CURRENT_COVERED_AREAS = new observableArray.ObservableArray();

var PICKUP_DATA = {};
var SELECTED_COUNTRY_POS = -1;
var SELECTED_REGION_POS = -1;
var SELECTED_DISTRICT_POS = -1;
var SELECTED_COVERED_AREA_POS = -1;

var SELECTED_COUNTRY = undefined;
var SELECTED_REGION = undefined;
var SELECTED_DISTRICT = undefined;
var SELECTED_COVERED_AREA = undefined;


var SHOW_NEW_PICK_UP_FORM = false;


//ease functions
var loaderStatus = function(status) {
    if (status == 1) {
        VM.set("loadingStatus", true);
    } else {
        VM.set("loadingStatus", false);
    }
};

//since pick is stored in db
var setPickUpObjects = function(){
    
    var PickUpObj = GDbModule.getThisPickUpPoint();
    if(PickUpObj == undefined){
        VM.set("SHOW_NEW_PICK_UP_FORM",true);
        return;
    }
    VM.set("PickUpObj",PickUpObj);
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
            //console.log("[DATA] => " + JSON.stringify(contentOBJ.msg_data));
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
    //alert(JSON.stringify($event.newIndex));
    var country_index = $event.newIndex;
    
    //set regions for this country
    var countries_map = VM.get('COUNTRIES_MAP');
    CURRENT_REGIONS = [];
    for(var i = 0; i < countries_map[country_index].regions.length;i++){
        CURRENT_REGIONS.push(countries_map[country_index].regions[i].name);
    }
    VM.set("CURRENT_REGIONS",CURRENT_REGIONS);
    VM.set("SELECTED_COUNTRY",countries_map[country_index]);
    VM.set("SELECTED_COUNTRY_POS",country_index);

    //clear below set
    VM.set("SELECTED_REGION",undefined);
};
/**regions changed */
exports.regionDropDownSelectedIndexChanged = function($event){
    console.log("[REGION CHANGED]");
    //alert(JSON.stringify($event.newIndex));
    var region_index = $event.newIndex;

    //console.log("[CURRENT COUNTRY] " + JSON.stringify(VM.get('SELECTED_COUNTRY')));
    
    //set districts for this region
    var selected_country_obj = VM.get('SELECTED_COUNTRY');//OR --(VM.get('COUNTRIES_MAP'))[VM.get('SELECTED_COUNTRY_POS')];
    CURRENT_DISTRICTS = [];
    //console.log("REGIONOBJ::::" + JSON.stringify(selected_country_obj.);
    //console.log("[country pos] "+ JSON.stringify(selected_country_obj));
    for(var i = 0; i < selected_country_obj.regions[region_index].districts.length;i++){
        CURRENT_DISTRICTS.push(selected_country_obj.regions[region_index].districts[i].name);
    }

    VM.set("CURRENT_DISTRICTS",CURRENT_DISTRICTS);
    VM.set("SELECTED_REGION",selected_country_obj.regions[region_index]);
    VM.set("SELECTED_REGION_POS",region_index);

    //clear below set
    VM.set("SELECTED_DISTRICT",undefined);
};
/**district changed */
exports.districtDropDownSelectedIndexChanged = function($event){
    console.log("[DISTRICT CHANGED]");
    //alert(JSON.stringify($event.newIndex));
    var district_index = $event.newIndex;

    //set covered areas for this district
    var selected_region_obj = VM.get('SELECTED_REGION');//
    CURRENT_COVERED_AREAS = [];
    for(var i = 0; i < selected_region_obj.districts[district_index].covered_areas.length;i++){
        CURRENT_COVERED_AREAS.push(selected_region_obj.districts[district_index].covered_areas[i].name);
    }

    VM.set("CURRENT_COVERED_AREAS",CURRENT_COVERED_AREAS);
    VM.set("SELECTED_DISTRICT",selected_region_obj.districts[district_index]);
    VM.set("SELECTED_DISTRICT_POS",district_index);

    //clear below set
    VM.set("SELECTED_COVERED_AREA",undefined);
};
/**covered area changed */
exports.coveredAreaDropDownSelectedIndexChanged = function($event){
    console.log("[COVERED AREA CHANGED]");
    //alert(JSON.stringify($event.newIndex));
    var covered_area_index = $event.newIndex;
    var selected_district_obj = VM.get('SELECTED_DISTRICT');//
    VM.set("SELECTED_COVERED_AREA",selected_district_obj.covered_areas[covered_area_index]);
    VM.set("SELECTED_COVERED_AREA_POS",covered_area_index);
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
    VM.set("SHOW_NEW_PICK_UP_FORM",false);
    setPickUpObjects();
    var CURRENT_USER = GDbModule.getThisUser();
    get_countries_map();//get countries list/regions/districts/covered_areas


    //toggle new Pickup
    VM.useNewPickUp = function(){
        if(VM.get("SHOW_NEW_PICK_UP_FORM") == true){
            if(GDbModule.getThisPickUpPoint() == undefined){
                VM.set("SHOW_NEW_PICK_UP_FORM",true); 
            }else{
                VM.set("SHOW_NEW_PICK_UP_FORM",false); 
            }
        }else{
            VM.set("SHOW_NEW_PICK_UP_FORM",true);
        }
    };

    //when user decide to use previous location
    VM.usePreviousPickUpAddress = function(){
        GrandNavigator.goSetPickUpForm3({pickup_data: PICKUP_DATA,pickup_address_obj : GDbModule.getThisPickUpPoint()});
        return;
    };

    //when user decide to use new pick up location
    VM.useNewPickUpAddress = function(){
        // 
        if(VM.sender_phone == "" || VM.sender_phone == null || VM.get('SELECTED_COUNTRY') == undefined || VM.get('SELECTED_REGION') == undefined || VM.get('SELECTED_DISTRICT') == undefined || VM.get('SELECTED_COVERED_AREA') == undefined){
            GCustomHelpersModule.getSimpleAlert("Error", "Hakiki fomu yako!");
            return;
        }
        var $country_id = (VM.get('SELECTED_COUNTRY')).id;
        var $region_id = (VM.get('SELECTED_REGION')).id;
        var $district_id = (VM.get('SELECTED_DISTRICT')).id;
        var $covered_area_id = (VM.get('SELECTED_COVERED_AREA')).id;
        var $location = VM.location;
        var $phone = VM.sender_phone;
        var $name = VM.sender_name; 

        var dt2LocalDB = {
            country_obj : VM.get('SELECTED_COUNTRY'),
            region_obj :  VM.get('SELECTED_REGION'),
            district_obj : VM.get('SELECTED_DISTRICT'),
            covered_area_obj : VM.get('SELECTED_COVERED_AREA'),
            specific_area : $location,
            phone : $phone,
            name : $name,
            address_for : "PICK_UP"
        };
        GrandNavigator.goSetPickUpForm3({pickup_data: PICKUP_DATA,pickup_address_obj : dt2LocalDB});
        return;
    };

    page.bindingContext = VM;
};







exports.onNavigatingTo = function(args){
    var page = args.object;
    PICKUP_DATA = page.navigationContext.PICKUP_DATA;
    //console.log("[FROM step1]::PICKUP-DATA ::" +JSON.stringify(PICKUP_DATA));
};
exports.onNavigatedTo = function(args){
    var page = args.object;
    PICKUP_DATA = page.navigationContext.PICKUP_DATA;
};

//navigatedTo="onNavigatedTo" navigatingTo="onNavigatingTo"

