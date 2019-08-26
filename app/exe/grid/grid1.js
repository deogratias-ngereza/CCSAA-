
var Observable = require('data/observable').Observable;
var FrameModule = require('ui/frame');

exports.onLoaded = function(args){
    var page = args.object;

    var VM = new Observable();
    VM.nextPage = function(){
        //alert("next");
        FrameModule.topmost().navigate({
            moduleName : 'hello/hello',
            animated: true,
            transition: {
                name: 'slide',
                duration: 500,
                curve: 'easeOut'
            }
        });
    };

    page.bindingContext = VM;
};

exports.onNavigatedTo = function(args){

};