var view = require("ui/core/view");
var Observable = require('data/observable').Observable;
var FrameModule = require('ui/frame');
var TopFrame = require('ui/frame').topmost();
var nsDrawer;
var pageRef = null;

var GrandNavigator = require('./../../core/GrandNavigator');
var GCustomHelpersModule = require("./../../core/GrandCustomHelpers");
var GApiModule = require("./../../core/GrandAPI");
var GDbModule = require("./../../core/GrandDB");
var VM = new Observable();

exports.onLoaded = function(args) {
    var page = args.object;
    pageRef = page;
    var actionBar = page.getViewById('actionBar');
    var sideBarDrawer = page.getViewById('sideBarDrawer');
    actionBar.backgroundColor = GCustomHelpersModule.getBaseColor();//background color;
    //sideBarDrawer.backgroundColor = GCustomHelpersModule.getBaseColor();//background color;
    nsDrawer = view.getViewById(page, "sideDrawer");




    VM.onCloseDrawerTap = function(){
        nsDrawer.closeDrawer();
    };
    VM.onShowDrawerTap = function(){
        nsDrawer.showDrawer();
    };


    VM.onDrawerToggle = function(){ 
        nsDrawer.toggleDrawerState();
        var menuCollapseIco = page.getViewById('menuCollapseIco');
        menuCollapseIco.animate({
            rotate: 360, // will take into account originX and originY
            duration: 500
        }).then(()=> menuCollapseIco.rotate = 0);
    };

    

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
    VM.changePassword = function(){
        GrandNavigator.goChangePassword();
    };
    VM.logout = function(){
        GDbModule.clearAll();
        GrandNavigator.goLogin();
    };




    page.bindingContext = VM;
};
