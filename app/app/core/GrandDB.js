/***
 * 
 * 
 * CART SAVE MODULE
 * => using Application settings
 * 
 * 
 * => CURRENT_CONFIG
 *      
 */

var appSettings = require("application-settings");

//keys names
var currentUser = "CURRENT_USER";
var currentUserToken = "CURRENT_TOKEN";
var currentConfig = "CURRENT_CONFIG";
var currentCenterConfig = "CURRENT_CENTER_CONFIG";
var currentLocation = "CURRENT_LOCATION";
var currentFBToken = "CURRENT_FB_TOKEN";
var currentOTPReceiveModeOn = "CURRENT_OTP_RECEIVE_MODE_ON";
var currentOTPRecCustID = "CURRENT_OTP_REC_CUST_ID";
var currentPickUpPoint = "CURRENT_PICK_UP_POINT";
var currentDeliveryPoint = "CURRENT_DELIVERY_POINT";
var currentCountriesMap = "CURRENT_COUNTRIES_MAP";


/**countries map */
exports.saveCurrentCountriesMap = function(data) {
    if (appSettings.hasKey(currentCountriesMap)) {
        appSettings.remove(currentCountriesMap);
        appSettings.setString(currentCountriesMap, data);
    } else {
        appSettings.setString(currentCountriesMap, data);
    }
};
exports.getCurrentCountriesMap = function() {
    if (appSettings.hasKey(currentCountriesMap)) {
        return JSON.parse(appSettings.getString(currentCountriesMap));
    } else {
        return undefined;
    }
};


/**otp receiving mode is on */
exports.saveCurrentOTPReceivingMode = function(mode) {
    if (appSettings.hasKey(currentOTPReceiveModeOn)) {
        appSettings.remove(currentOTPReceiveModeOn);
        appSettings.setBoolean(currentOTPReceiveModeOn, mode);
    } else {
        appSettings.setBoolean(currentOTPReceiveModeOn, mode);
    }
};
exports.getCurrentOTPReceivingMode = function() {
    if (appSettings.hasKey(currentOTPReceiveModeOn)) {
        return appSettings.getBoolean(currentOTPReceiveModeOn);
        
    } else {
        return false;
    }
};
/**currentOTPCustID */
exports.saveCurrentOTPRecCustID = function(id) {
    if (appSettings.hasKey(currentOTPRecCustID)) {
        appSettings.remove(currentOTPRecCustID);
        appSettings.setNumber(currentOTPRecCustID, id);
    } else {
        appSettings.setNumber(currentOTPRecCustID, id);
    }
};
exports.getCurrentOTPRecCustID = function() {
    if (appSettings.hasKey(currentOTPRecCustID)) {
        return appSettings.getNumber(currentOTPRecCustID);
    } else {
        return undefined;
    }
};


exports.removeCurrentOTPRecCustID = function() {
    appSettings.remove(currentOTPRecCustID);
};

/** */
exports.savePickUpPoint = function(p) {
    if (appSettings.hasKey(currentPickUpPoint)) {
        appSettings.remove(currentPickUpPoint);
        appSettings.setString(currentPickUpPoint, JSON.stringify(p));
    } else {
        appSettings.setString(currentPickUpPoint, JSON.stringify(p));
    }
};
exports.saveDeliveryPoint = function(p) {
    if (appSettings.hasKey(currentDeliveryPoint)) {
        appSettings.remove(currentDeliveryPoint);
        appSettings.setString(currentDeliveryPoint, JSON.stringify(p));
    } else {
        appSettings.setString(currentDeliveryPoint, JSON.stringify(p));
    }
};
exports.getThisPickUpPoint = function() {
    if (appSettings.hasKey(currentPickUpPoint)) {
        return JSON.parse(appSettings.getString(currentPickUpPoint));
    } else {
        return undefined;
    }
};
exports.getThisDeliverypPoint = function() {
    if (appSettings.hasKey(currentDeliveryPoint)) {
        return JSON.parse(appSettings.getString(currentDeliveryPoint));
    } else {
        return undefined;
    }
};






//save the user object
exports.saveThisUser = function(userObj) {
    if (appSettings.hasKey(currentUser)) {
        appSettings.remove(currentUser);
        appSettings.setString(currentUser, JSON.stringify(userObj));
    } else {
        appSettings.setString(currentUser, JSON.stringify(userObj));
    }
};
//save user token
exports.saveThisUserToken = function(userToken) {
    if (appSettings.hasKey(userToken)) {
        appSettings.remove(userToken);
        appSettings.setString(currentUserToken, JSON.stringify(userToken));
    } else {
        appSettings.setString(currentUserToken, JSON.stringify(userToken));
    }
};

//save the center config object
exports.saveThisCenterConfig = function(con) {
    if (appSettings.hasKey(currentCenterConfig)) {
        appSettings.remove(currentCenterConfig);
        appSettings.setString(currentCenterConfig, JSON.stringify(con));
    } else {
        appSettings.setString(currentCenterConfig, JSON.stringify(con));
    }
};
//save the current location
exports.saveCurrentLocation = function(con) {
    if (appSettings.hasKey(currentLocation)) {
        appSettings.remove(currentLocation);
        appSettings.setString(currentLocation, JSON.stringify(con));
    } else {
        appSettings.setString(currentLocation, JSON.stringify(con));
    } 
};
//firebase token
exports.saveCurrentFBToken = function(con) {
    if (appSettings.hasKey(currentFBToken)) {
        appSettings.remove(currentFBToken);
        appSettings.setString(currentFBToken, JSON.stringify(con));
    } else {
        appSettings.setString(currentFBToken, JSON.stringify(con));
    }
};





//save the config object
exports.saveThisConfig = function(configObj) {
    if (appSettings.hasKey(configObj)) {
        appSettings.remove(configObj);
        appSettings.setString(configObj, JSON.stringify(configObj));
    } else {
        appSettings.setString(currentConfig, JSON.stringify(configObj));
    }
};




//return a current user..
exports.getThisUser = function() {
    if (appSettings.hasKey(currentUser)) {
        return JSON.parse(appSettings.getString(currentUser));
    } else {
        return undefined;
    }
};

//return a current center configs..
exports.getThisCenterConfig = function() {
    if (appSettings.hasKey(currentCenterConfig)) {
        return JSON.parse(appSettings.getString(currentCenterConfig));
    } else {
        return undefined;
    }
};


exports.getThisUserToken = function() {
    if (appSettings.hasKey(currentUserToken)) {
        return JSON.parse(appSettings.getString(currentUserToken));
    } else {
        return undefined;
    }
};

//get current location
exports.getCurrentLocation = function() {
    if (appSettings.hasKey(currentLocation)) {
        return JSON.parse(appSettings.getString(currentLocation));
    } else {
        return undefined;
    }
};

//get current FB token
exports.getCurrentFBToken = function() {
    if (appSettings.hasKey(currentFBToken)) {
        return JSON.parse(appSettings.getString(currentFBToken));
    } else {
        return undefined;
    }
};


//return a current config..
exports.getThisConfig = function() {
    if (appSettings.hasKey(currentConfig)) {
        return JSON.parse(appSettings.getString(currentConfig));
    } else {
        return undefined;
    }
};





//remove any given object..
exports.removeThisObject = function(k) {
    if (appSettings.hasKey(k)) {
        appSettings.remove(k);
    }
};


//clear
exports.clearAll = function() {
    appSettings.clear();
};