
var Observable = require('data/observable').Observable;
var GrandNavigator = require('./../../core/GrandNavigator');

exports.onLoaded = function(args) {
    var page = args.object;
     
    var VM = new Observable();
    VM.addNewImport = function(){
        alert("Thanks, new import added");
    };

    page.bindingContext = VM;
};
