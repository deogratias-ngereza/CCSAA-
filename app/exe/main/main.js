var view = require("ui/core/view");
var Observable = require('data/observable').Observable;
var FrameModule = require('ui/frame');
var TopFrame = require('ui/frame').topmost();
var nsDrawer;


exports.onLoaded = function(args) {
    var page = args.object;
    
    nsDrawer = view.getViewById(page, "sideDrawer");

    var VM = new Observable();
    VM.onCloseDrawerTap = function(){
        nsDrawer.closeDrawer();
    };
    VM.onShowDrawerTap = function(){
        nsDrawer.showDrawer();
    };

    page.bindingContext = VM;
};
