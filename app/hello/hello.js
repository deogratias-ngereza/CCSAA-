

var hello_vm = require("./hello-vm");
exports.onLoaded = function(args) {
    var page = args.object;
    page.bindingContext = hello_vm.VM(page);  
};



/*
var Observable = require('data/observable');
var ObservableArray = require('data/observable-array');

var booksCollection = new ObservableArray.ObservableArray(
    [
        {name : "Lucas",author:"Nyambari",year:2017},
        {name : "Victor",author:"Nyambari",year:2017}, 
        {name : "Ali",author:"Nyambari",year:2017}
    ]
);



exports.onLoaded= function(args){
    var page = args.object;
    var VM = new Observable.Observable();
    VM.msg = "Grand Master";
    VM.set("books",booksCollection);


    VM.changeFirstName = function(){
        booksCollection.getItem(0).name = VM.msg;
        var liUI = page.getViewById('myList');
        liUI.refresh();
        //booksCollection.push({name : "Test",author:"Nyambari",year:2017});
    };

    page.bindingContext = VM;
};
*/