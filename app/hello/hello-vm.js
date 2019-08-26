var Observable = require("data/observable").Observable;
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const fromObject = require("data/observable").fromObject;


var PAGE = undefined;


var _msg = "Hello 4rm VM";
var booksCollection = new ObservableArray(
    [
        {name : "Lucas",author:"Nyambari",year:2017},
        {name : "Victor",author:"Nyambari",year:2017}, 
        {name : "Ali",author:"Nyambari",year:2017}
    ]
);


exports.VM = function(p){
    PAGE = p;
    var VM = new Observable();
    VM.msg = _msg;

    VM.books = booksCollection;
    
    VM.changeFirstName = function(){
        //booksCollection.push({name : "Grabd",author:"Nyambari",year:2017});
        booksCollection.getItem(0).name = VM.msg;
        var liUI = PAGE.getViewById('myList');
        liUI.refresh();
    };
    return VM;
};