var view = require("ui/core/view");
var Observable = require('data/observable').Observable;
var FrameModule = require('ui/frame');
var TopFrame = require('ui/frame').topmost();
var GrandNavigator = require('./../../core/GrandNavigator');
var nsDrawer;
var VM = new Observable();

/**ADMOB */
var admobModule = require("nativescript-admob");
var createBanner = function() {
    admobModule.createBanner({
        testing: true,
        size: admobModule.AD_SIZE.SMART_BANNER,
        //iosBannerId: "ca-app-pub-XXXX/YYYY",
        //androidBannerId: "ca-app-pub-8484876663669956/4829934281",
        androidBannerId: true//testing
            ? "ca-app-pub-3940256099942544/6300978111"  // global test banner id
            : "ca-app-pub-8484876663669956/4829934281", // our registered banner id
        //iosTestDeviceIds: ["yourTestDeviceUDIDs"],
        margins: {
            bottom: 0 
        }
    }).then(function() {
        console.log("admob createBanner done");
    }, function(error) {
        console.log("admob createBanner error: " + error);
    });
}
exports.hideBanner = function() {
    admobModule.hideBanner().then(function() {
        console.log("admob hideBanner done");
    }, function(error) {
        console.log("admob hideBanner error: " + error);
    });
}

exports.onLoaded = function(args) {
    var page = args.object;
    
    nsDrawer = view.getViewById(page, "sideDrawer");

    setTimeout(() => {
        createBanner();
    }, 1000);     

    /*follow the links */ 
    VM.helpPage = function(){
        GrandNavigator.goHelp();
    };
    VM.link2PhyBoxPage = function(){
        GrandNavigator.goBox();
    };
    VM.dashPage = function(){
        GrandNavigator.goHome();
    };
    VM.pickUpPage = function(){
        GrandNavigator.goPickups();
    };
    VM.deliveriesPage = function(){
        GrandNavigator.goDeliveriesList();
    };
    VM.profilePage = function(){
        GrandNavigator.goProfile();
    };
    VM.trackPage = function(){
        GrandNavigator.goTrack();
    };
    VM.notificationPage = function(){
        GrandNavigator.goNotifications();
    };
    VM.mailsDispatchPage = function(){
        GrandNavigator.goMails();
    };
    VM.setAddressPage = function(){
        GrandNavigator.goSetAddress();
    };
    VM.activateAccntPage = function(){
        alert("YOUR ACCOUNT IS ACTIVE");
    };    

    page.bindingContext = VM;
};




