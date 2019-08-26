var GrandNavigator = require('./../../core/GrandNavigator');
var GCustomHelpersModule = require("./../../core/GrandCustomHelpers");
var GApiModule = require("./../../core/GrandAPI");
var GDbModule = require("./../../core/GrandDB");
var VM = require('./create_manifest-vm').VM();



exports.onLoaded = function(args) {
    var page = args.object;
    page.bindingContext = VM;

    
};


exports.onNavigatedTo = function(args) {
    
};
exports.onNavigatingTo = function(args) {
    
};