var view = require("ui/core/view");
var Observable = require('data/observable').Observable;
var FrameModule = require('ui/frame');
var TopFrame = require('ui/frame').topmost();

exports.onLoaded = function(args) {
    var page = args.object;
    
    var VM = new Observable();

    VM.goBack = function(){
        FrameModule.topmost().goBack();
    };


    page.bindingContext = VM;
};
