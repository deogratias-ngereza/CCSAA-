var app = require("application");
//var permissions = require('nativescript-permissions');
//var connectivity = require("connectivity");
var dialogs = require("ui/dialogs");
var Toast = require("nativescript-toast");





/***
 * GRAND
 * CONNECTIVITY
 */

exports.isPhoneConnectedToTheInternet = function() {
    var connectionType = connectivity.getConnectionType();
    switch (connectionType) {
        case connectivity.connectionType.none:
            //console.log("No connection");
            return false;
            break;
        case connectivity.connectionType.wifi:
            //console.log("WiFi connection");
            return true;
            break;
        case connectivity.connectionType.mobile:
            //console.log("Mobile connection");
            return true;
            break;
    }

};


/**COLOR  */
exports.getBaseColor = function(){
    return "#229B89"; 
};






/****
 * CUSTOM
 * DIALOGS
 */

//get simple dialog
exports.getSimpleAlert = function($title, $message) {
    var options = {
        title: $title,
        message: $message
    };
    dialogs.action(options).then((result) => {
        //console.log(result);
    });
    return;
};






/***
 * 
 * CART
 * TOASTS
 * 
 */
exports.getSimpleShortToast = function(msg) {
    Toast.makeText(msg).show();
};
exports.getSimpleLongToast = function(msg) {
    Toast.makeText(msg, "long").show();
};




/**list of regions */
exports.getRegionsArray = function(){
    return [
        "DAR ES SALAAM","MOROGORO","MWANZA","KIGOMA","ARUSHA","IRINGA","TABORA","TANGA","DODOMA","KILIMANJARO","LINDI","MTWARA","SINGIDA","SHINYANGA","NJOMBE","KAHAMA","RUKWA","MBEYA","RUVUMA","KAGERA","GEITA","SIMIYU","KATAVI","MANYARA","MUSOMA","ZANZIBAR","PEMBA","BUKOBA","SONGEA"
    ];
};


exports.getRandomLowerCaseAplhaNumericKey = function(len){
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";//ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
  
    for (var i = 0; i < len; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
};