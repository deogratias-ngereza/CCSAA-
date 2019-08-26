var view = require("ui/core/view");
var Observable = require('data/observable').Observable;
var FrameModule = require('ui/frame');
var TopFrame = require('ui/frame').topmost();
var nsDrawer;


exports.onLoaded = function(args) {
    var page = args.object;
    
    nsDrawer = view.getViewById(page, "sideDrawer");


    var VM = new Observable();
    VM.goHelloPage = function(){
        FrameModule.topmost().navigate({
            moduleName : 'hello/hello',animated:true,transition: {
                name: 'slide',
                duration: 450,
                curve: 'easeIn'
            }
        });
    };


    page.bindingContext = VM;
};
