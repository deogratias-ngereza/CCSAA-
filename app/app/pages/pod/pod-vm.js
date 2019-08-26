var Observable = require("data/observable").Observable;
const ImgSrcModule = require("tns-core-modules/image-source");
const FileSysModule = require("tns-core-modules/file-system");

var GrandNavigator = require('./../../core/GrandNavigator');
var GCustomHelpersModule = require("./../../core/GrandCustomHelpers");
var GApiModule = require("./../../core/GrandAPI");

//const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const fromObject = require("data/observable").fromObject;

var VM = new Observable();

//ease functions
var loaderStatus = function(status) {
    if (status == 1) {
        VM.set("loadingStatus", true);
    } else {
        VM.set("loadingStatus", false);
    }
}; 


var markAsDelivered = function($data){
    loaderStatus(1);
    var source = new ImgSrcModule.ImageSource()
    var $myImg = ImgSrcModule.fromNativeSource(VM.get('PODImage'));

    //return;

    //save img 
    ///const imgSrc = ImgSrcModule.fromFile(imagePath);
    const folderDest = FileSysModule.knownFolders.documents();
    const pathDest = FileSysModule.path.join(folderDest.path, "gsign.jpg");
    const saved = $myImg.saveToFile(pathDest, "jpg"); 
    if (saved) {
        //alert("file saved");
        console.log("Image saved successfully!\n" + pathDest + "\n");
        loaderStatus(1);
        var conn = GApiModule.grand_basic_image_post("mark_pod", $data , pathDest);
        conn.on("complete", (event) => {
            loaderStatus(0);
            GrandNavigator.goHome();
            GCustomHelpersModule.getSimpleAlert("Thank you", "Deal Done");
            console.log("[success]" + JSON.stringify(event));
        }); 
        conn.on("error", event => {
            loaderStatus(0);
            GCustomHelpersModule.getSimpleAlert("Error", "Sorry there was an error!!");
            console.log("[error]"+JSON.stringify(event));
        });
        conn.on("responded", (e) => {
            //var res = JSON.parse(e.data);
            loaderStatus(0);
            console.log("[ responded ]  "+JSON.stringify(e.data));
        });
    }else{
        GCustomHelpersModule.getSimpleAlert("Sign Capture Error", "Fail to capture a sign!");
    }
};



 


exports.VM = function(){
    
    VM.loadingStatus = false; 
    VM.currentUserObj = {};
    VM.currentPage = undefined;

    VM.DeliveryObj = {};

    VM.PODObj = fromObject({
        receiver_name:"",
        receiver_phone:""
    });
    VM.PODImage = undefined;

    VM.goLogin = function(){
        GrandNavigator.goLogin();
    };

    VM.confirm = function(){
        var drawingPad = VM.currentPage.getViewById('drawingPad');
        drawingPad.getDrawing().then((res) => {
            //console.log(res);
            VM.set("PODImage",res);
            
            var obj = {
                manifest_id : VM.DeliveryObj.id,
                receiver_name:VM.PODObj.receiver_name,//
                receiver_phone:VM.PODObj.receiver_phone,//
                manifest_track_no : VM.DeliveryObj.manifest_track_no,
                worker_id:VM.DeliveryObj.transporter.id,
                customer_id:VM.DeliveryObj.customer.id,
                product_id:VM.DeliveryObj.product.id
            };
            markAsDelivered(obj);
        });  
    }; 
    VM.clearDrawings = function(){
        var drawingPad = VM.currentPage.getViewById('drawingPad');
        drawingPad.clearDrawing();
        VM.set("PODImage",undefined);
    };

    return VM;
};
