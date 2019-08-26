var GDbModule = require("./GrandDB");
var GCustomHelpersModule = require("./GrandCustomHelpers");

exports.isUserLoggedIn = function() {
    if (GDbModule.getThisUser() == undefined) {
        return false;
    }
    return true;
};



exports.logout = function() { 
    GDbModule.removeThisObject("CURRENT_USER");
    GDbModule.removeThisObject("CURRENT_TOKEN");
    GCustomHelpersModule.getSimpleShortToast("You are now Logout");
};