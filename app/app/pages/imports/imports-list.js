var GrandNavigator = require('./../../core/GrandNavigator');
var GCustomHelpersModule = require("./../../core/GrandCustomHelpers");
var GApiModule = require("./../../core/GrandAPI");
var GDbModule = require("./../../core/GrandDB");
var VM = require('./imports-list-vm.js').VM();


/**check if user object is there */
var validateUser = function(){
    var userObj = GDbModule.getThisUser();
    VM.set("currentUserObj",userObj);
    /**if already logged in */
    if(userObj == undefined){
        GCustomHelpersModule.getSimpleShortToast("Go login please!");
        VM.goLogin();
    }
};


exports.onLoaded = function(args) {
    var page = args.object;
    page.bindingContext = VM;
    validateUser();
};



//ease functions
var loaderStatus = function(status) {
    if (status == 1) {
        VM.set("loadingStatus", true);
    } else {
        VM.set("loadingStatus", false);
    }
};