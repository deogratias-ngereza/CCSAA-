var frameModule = require("ui/frame");


/***
 * CART
 * NAVIGATOR
 * 
 */
exports.getNavigationPathFor = function(page) {
    switch (page) {
        case 'home':
            //return './app/pages/welcome/welcome';
            return './app/pages/layout/main';
            break;
        case 'help':
            return './app/pages/help/help';
            break;
        case 'box':
            return './app/pages/box/box';
            break;
        case 'mails':
            return './app/pages/mails/mails';
            break;
        case 'notifications':
            return './app/pages/notifications/notifications';
            break;
        case 'pickups':
            return './app/pages/pickups/pickups';
            break;
        case 'profile':
            return './app/pages/profile/profile';
            break;
        case 'register':
            return './app/pages/signup/signup'
            break;
        case 'recover':
            return './app/pages/recover_password/password_recover';
            break;
        case 'addresses':
            return './app/pages/set_address/set_address';
            break;
        case 'verify_otp':
            return './app/pages/receive_reg_otp/receive_reg_otp';
            break;
        case 'receive_reg_otp':
            return './app/pages/receive_reg_otp/receive_reg_otp';
            break;
        case 'set_pick_del_points':
            return './app/pages/set_pick_del_points/set_pick_del_points';
            break;
        case 'new_pick_up':
            return './app/pages/new_pick_up/new_pick_up';
            break;
        case 'set_pickup_place_f2':
            return './app/pages/new_pick_up/set_pickup_place_f2';
            break;
        case 'finalizing_pick_up_order':
            return './app/pages/new_pick_up/finalizing_order';
            break;
        case 'set_delivery_place_f3':
            return './app/pages/new_pick_up/set_delivery_place_f3';
            break;
        case 'view_manifest':
            return './app/pages/view_manifest/view_manifest';
            break;
        case 'manifests':
            return './app/pages/manifests/manifests';
            break;
        case 'set_delivery_request':
            return './app/pages/set_delivery_request/set_delivery_request';
            break;
        case 'change_password':
            return './app/pages/change_password/change_password';
            break;
            
               
            

        case 'login':
            return './app/pages/login/login';
            break;
        case 'imports-list':
            return './app/pages/imports/imports-list';
            break;
        case 'new-import':
            return './app/pages/imports/new-import';
            break;
        case 'deliveries-list':
            return './app/pages/deliveries/deliveries-list';
            break;
        case 'pod':
            return './app/pages/pod/pod';
            break;
        case 'track':
            return './app/pages/track/track';
            break;








        
       
        case 'error_net':
            return './cart/views/pages/errors/no_net';
            break;
        case 'error_wrong':
            return './cart/views/pages/errors/wrong';
            break;
        case 'error_server_down':
            return './cart/views/pages/errors/server_down';
            break;
      
        default:
            return '';
    }
};
exports.goBack = function() {
    frameModule.topmost().goBack();
};

exports.goLogin = function($data) {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("login"),
        //context : { "OPTIONS" : $data },
        clearHistory: true,
        animated: true,
        transition: {
            name: 'slide',
            duration: 300,
            curve: 'easeIn'
        }
    });
};//
exports.goHelp = function() {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("help"),
        animated: true,
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goBox = function() {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("box"),
        animated: true,
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goMails = function() {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("mails"),
        animated: true,
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goNotifications = function() {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("notifications"),
        animated: true,
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goPickups = function() {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("pickups"),
        animated: true,
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goProfile= function() {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("profile"),
        animated: true,
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goTrack = function() {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("track"),
        animated: true,
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goSetAddress = function() {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("addresses"),
        animated: true,
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goSignup = function() {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("register"),
        animated: true,
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goRecover = function() {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("recover"),
        animated: true,
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goVerifyOTP = function() {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("verify_otp"),
        animated: true,
        clearHistory: true,
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goReceiveRegOTP = function() {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("receive_reg_otp"),
        animated: true,
        clearHistory: true,
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goPickOrDelSet = function(opt) {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("set_pick_del_points"),
        context : { "OPTION" : opt },
        animated: true,
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goNewNewPickUp = function(opt) {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("new_pick_up"),
        animated: true,
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goSetPickUpForm2= function(data) {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("set_pickup_place_f2"),
        context : { "PICKUP_DATA" : data },
        animated: true,
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goSetPickUpForm3= function(data) {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("set_delivery_place_f3"),
        context : { "PICKUP_DATA" : data.pickup_data,"PICK_ADDRESS_OBJ":data.pickup_address_obj },
        animated: true,
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goFinalizingPickupOrder= function(data) {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("finalizing_pick_up_order"),
        context : { "PICKUP_DATA" : data.pickup_data,"PICK_ADDRESS_OBJ":data.pickup_address_obj,"DROP_ADDRESS_OBJ":data.drop_address_obj },
        animated: true,
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};

exports.goManifestPage = function(data) {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("manifests"),
        animated: true, 
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};

//
exports.goViewManifest = function(data) {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("view_manifest"),
        context : { "MANIFEST_DATA" : data },
        animated: true, 
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goSetDeliveryRequest= function(data) {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("set_delivery_request"),
        context : { "MANIFEST_DATA" : data },
        animated: true, 
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goChangePassword= function(data) {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("change_password"),
        animated: true, 
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goHome = function() {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("home"),
        animated: true,
        // Page navigation, without saving navigation history.
        //backstackVisible: false

         // Prevent user from going back using `clearHistory` property.
        clearHistory: true,
        transition: {
            name: 'fade',
            duration: 500,
            curve: 'easeIn'
        }
    });
};



exports.goImportsList = function() {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("imports-list"),
        animated: true,
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goNewImport = function() {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("new-import"),
        animated: true,
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goDeliveriesList = function() {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("deliveries-list"),
        animated: true,
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
exports.goPod = function($data) {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("pod"),
        context : { "DATA" : $data },
        animated: true,
        transition: {
            name: 'slide',
            duration: 500,
            curve: 'easeOut'
        }
    });
};
//
































exports.goNoNet = function() {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("error_net"),
        animated: true,
        transition: {
            name: 'fade',
            duration: 300,
            curve: 'easeIn'
        }
    });
};
exports.goWrong = function() {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("error_wrong"),
        animated: true,
        transition: {
            name: 'fade',
            duration: 300,
            curve: 'easeIn'
        }
    });
};
exports.goServerDown = function() {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("error_server_down"),
        animated: true,
        transition: {
            name: 'fade',
            duration: 300,
            curve: 'easeIn'
        }
    });
};

//search
exports.goSearch = function($SEARCH_KEY) {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("search"),
        context: { "S_KEY": $SEARCH_KEY },
        animated: true,
        transition: {
            name: 'slide',
            duration: 300,
            curve: 'easeIn'
        }
    });
};
//favourites
exports.goFav = function() {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("fav"),
        animated: true,
        transition: {
            name: 'slide',
            duration: 300,
            curve: 'easeIn'
        }
    });
};
//get mi to the store
exports.goMenu = function($data) {
    frameModule.topmost().navigate({
        moduleName: this.getNavigationPathFor("center_menu"),
        context: { "OPTIONS": $data },
        animated: true,
        transition: {
            name: 'fade',
            duration: 200,
            curve: 'easeOut'
        }
    });
};