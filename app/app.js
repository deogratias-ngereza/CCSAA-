/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

require("./bundle-config");
var application = require("application");

application.run({ moduleName: "app-root" });

//application.run({ moduleName: "app/pages/new_pick_up/new_pick_up" });
//application.run({ moduleName: "app/pages/receive_reg_otp/receive_reg_otp" });
//application.run({ moduleName: "app/pages/layout/main" });
//application.run({ moduleName: "app/pages/set_address/set_address" });
//application.run({ moduleName: "app/pages/signup/signup" });
//application.run({ moduleName: "app/pages/login/login" });
//application.run({ moduleName: "app/pages/mails/mails" });
//application.run({ moduleName: "exe/grid/grid1" });
//application.run({ moduleName: "app/pages/set_pick_del_points/set_pick_del_points" });

//application.run({ moduleName: "app/pages/new_pick_up/set_pickup_place_f2" });
//application.run({ moduleName: "app/pages/new_pick_up/set_delivery_place_f3" });
//application.run({ moduleName: "app/pages/new_pick_up/finalizing_order" });

//application.run({ moduleName: "app/pages/manifests/manifests" });

//
/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
