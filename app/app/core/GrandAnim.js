var enums = require("ui/enums");
var color = require("tns-core-modules/color");

/*
exports.testAnim = function($context, $element) {
    var p = $context;
    var v = p.getViewById($element);
    /*v.animate({
        //backgroundColor: new color.Color("#3D5AFE"),
        opacity: 0.5,
        duration: 3000
    });/
    v.animate({ duration: 1000, opacity: 0.9, scale: { x: 3, y: 3 } })
        .then(function() { return v.animate({ duration: 1000, opacity: 1 }); })
        //.then(function() { return v.animate({ duration: 100, translate: { x: 10, y: 0 } }); })
        //.then(function() { return v.animate({ duration: 100, translate: { x: 0, y: 0 } }); })
        //.then(function() { return v.animate({ duration: 100, translate: { x: -10, y: 0 } }); })
        //.then(function() { return v.animate({ duration: 100, translate: { x: 0, y: 0 } }); })
        //.then(function() { return v.animate({ translate: { x: 0, y: 0 } }); })
        .then(function() { return v.animate({ duration: 100, scale: { x: 2, y: 2 } }); })
        .then(function() { return v.animate({ duration: 1000, scale: { x: 1, y: 1 } }); })
        //.then(function() { return v.animate({ rotate: 180 }); })
        //.then(function() { return v.animate({ rotate: 0 }); })
        .then(function() {
            console.log("Animation finished");
        })
        .catch(function(e) {
            console.log(e.message);
        });

};
*/