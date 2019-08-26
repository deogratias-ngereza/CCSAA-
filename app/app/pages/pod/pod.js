
var VM = require('./pod-vm.js').VM();



exports.onNavigatedTo = function(args) {
    var page = args.object;
    var data = page.navigationContext;

    VM.set("DeliveryObj",data.DATA);
    VM.set("currentPage",page);
    VM.set("loadingStatus", false);

    page.bindingContext = VM;
}; 


exports.onLoaded = function(args) {
    var page = args.object;
    VM.set("loadingStatus", false);
};
exports.onNavigatingTo = function(args) {
    
};