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

/**custom sorting process */
var sortManifests = function(option){
    var manifestList = VM.ogManifestsList;
    var customList = [];
    for(var i = 0; i < manifestList.length;i++){
        if(option == "ALL"){
            customList.push(manifestList[i]);
        }
        else if(option == "SENT"){
            if(manifestList[i].source_warehouse_id == VM.userOBJ.id && (manifestList[i].status == "DELIVERED" || manifestList[i].status == "RECEIVED_BY_AGENT" || manifestList[i].status == "OUT_FOR_DELIVERY")){
                customList.push(manifestList[i]);
            }
        }
        else if(option == "RECEIVED"){
            if(manifestList[i].destination_warehouse_id == VM.userOBJ.id && manifestList[i].status == "DELIVERED"){
                customList.push(manifestList[i]);
            }
        }
        else if(option == "ONTRANSIT"){
            if(manifestList[i].source_warehouse_id == VM.userOBJ.id && manifestList[i].status == "ON_TRANSIT"){
                customList.push(manifestList[i]);
            }
        }else{
            customList.push(manifestList[i]);
        }
    }

    VM.set("ManifestsList",customList);
};



exports.onLoaded = function(args) {
    var page = args.object;
    loaderStatus(1);
    VM.set("userOBJ",GDbModule.getThisUser());
    VM.set("ManifestsList",[]);
    VM.set("ogManifestsList",[]);


    VM.getAllMyManifests = function(){
        loaderStatus(1);
        var conn = GApiModule.grand_basic_get("customer_manifest_search_by_id",{id : VM.userOBJ.id});console.log("[user]" + JSON.stringify(VM.userOBJ));
        conn.then((res) => {
            loaderStatus(0);
            var contentOBJ = JSON.parse(res.content);
            console.log("[ CODE ] " + res.statusCode);
            if (res.statusCode == 200) {
                VM.set("ManifestsList",contentOBJ.msg_data);
                VM.set("ogManifestsList",contentOBJ.msg_data);
            } else if(res.statusCode == 401){
                GCustomHelpersModule.getSimpleAlert("Error", contentOBJ.msg_data);
            }else{
                GCustomHelpersModule.getSimpleAlert("Error", "Something went wrong!");
            } 
        }, (error) => {
            loaderStatus(0);
            console.log("[ ERROR ] " + error);
            GCustomHelpersModule.getSimpleAlert("Server Error", "Sorry server is down for sometimes!");
            //custom redirect to error page
        });
    };


    VM.onItemTap = function(args){
        const index = args.index;
        var obj = VM.ManifestsList[index];
        
        /*if(obj.status == "DELIVERED" || obj.status == "PROCESSING" || obj.status == "RECEIVED"){
            GCustomHelpersModule.getSimpleAlert("Not Allowed", "Invalid status");
        }else{
            GrandNavigator.goPod(obj);
        }*/
        GrandNavigator.goViewManifest(obj);
        //console.log(JSON.stringify(obj));

    };


    



    VM.getReceived = function(){
        sortManifests("RECEIVED");
    };
    VM.getAll = function(){
        sortManifests("ALL");
    };
    VM.getSent = function(){
        sortManifests("SENT");
    };
    VM.getTransit = function(){
        sortManifests("ONTRANSIT");
    };
    
    VM.goBack = function(){
        FrameModule.topmost().goBack();
    };
    //

    setTimeout(() => {
        VM.getAllMyManifests();//init
    }, 500);

     


    page.bindingContext = VM;
};
 