var http = require("http");
//exports.api_root = "http://35.154.245.16:5001";
exports.api_root = "http://192.168.43.67:1001";
//

 

//any basic posts will be here 
exports.grand_basic_post = function(api_name, _data) {
    //application/x-www-form-urlencoded
    return http.request({
        url: this.getUrlForApiPage(api_name, {}),
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify(_data)
    });
};
exports.grand_basic_put = function(api_name, _data) {
    //application/x-www-form-urlencoded
    return http.request({
        url: this.getUrlForApiPage(api_name, _data),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify(_data) 
    });
}; 




//img 
exports.grand_basic_image_post = function(api_name, _data,imgPath) {
    var bghttp = require("nativescript-background-http");
    let session = bghttp.session("file-upload");
    let request = {
        url: this.getUrlForApiPage(api_name, {}),
        method: "POST"
    };
    console.log("upload_from: " + imgPath + "\n");
    let params = [
        { "name": "file", "filename": imgPath, "mimeType": "image/jpg" },
        { "name": "data" ,"value" : JSON.stringify(_data)}
    ];
    let task = session.multipartUpload(params, request);
    return task;
    
 

    //application/x-www-form-urlencoded
    /*return http.request({
        url: this.getUrlForApiPage(api_name, {}),
        method: "POST",
        headers: { 
            "Content-Type": "image/jpeg",
            file: img
        },
        file: img,
        content: JSON.stringify(_data)
        
    });*/

    /*var bghttp = require("nativescript-background-http");
    var session = bghttp.session("image-upload");
    var request = {
		url: this.getUrlForApiPage(api_name, {}),
		method: "POST",
		headers: {
			"Content-Type": "application/octet-stream",
			"File-Name": "gfile"
		},
		description: ""
    };alert("upload")
    return session.uploadFile(img, request);*/
};

//basic get requests
exports.grand_basic_get = function(api_name, data) {
    return http.request({
        url: this.getUrlForApiPage(api_name, data),
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
};
//basic get requests  from any url given(paginations)
exports.grand_basic_get_fromUrl = function($url) {
    return http.request({
        url: $url,
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
};




/***
 * RETURN URL FOR ANY NAMED API
 */
exports.getUrlForApiPage = function(page, data) {
    switch (page) {



        /**CCSAA -Courier Customer Simple Android App */
        case "post_register":
            return this.api_root + "/ccsaa-api-v1/register";
            break;



            















        /*** */
        //basic post requests
        case "get_connectivity":
            return this.api_root + ""; 
            break; //test connectivity

            
        case "post_login":
            return this.api_root + "/ccsaa-api-v1/login_by_phone";
            break;
        case "reset_password":
            return this.api_root + "/ccsaa-api-v1/reset_password";
            break;
        case "post_validate_otp_reg":
            return this.api_root + "/ccsaa-api-v1/verify_otp";
            break;
        case "resend_reg_otp":
            return this.api_root + "/ccsaa-api-v1/resend_reg_otp";
            break;
        case "request_password_recovery":
            return this.api_root + "/ccsaa-api-v1/request_password_recovery";
            break;
        case "get_all_imports":
            return this.api_root + "/ccsaa-api-v1/wh_imports";
            break;
        case "get_my_deliveries":
            return this.api_root + "/ccsaa-api-v1/my_deliveries/" + data.id;
            break;
        case "mark_pod":
            return this.api_root + "/ccsaa-api-v1/mark_pod";
            break;
        case "insert_customer_address":
            return this.api_root + "/ccsaa-api-v1/customer_addresses_insert";
            break;
        case "customer_update":
            return this.api_root + "/ccsaa-api-v1/customer_update/" + data.id;
            break;
        case "pickup_request_insert":
            return this.api_root + "/ccsaa-api-v1/pickup_request_insert";
            break;
        case "pickup_requests_for_customer":
            return this.api_root + "/ccsaa-api-v1/pickup_requests_for_customer/" + data.id;
            break;
        case "customer_manifest_search_by_id":
            return this.api_root + "/ccsaa-api-v1/customer_manifest_search_by_id/" + data.id;
            break;
        case "get_history_for_manifest":
            return this.api_root + "/ccsaa-api-v1/get_history_for_manifest/" + data.id;
            break;//NOT USErD 
        case "get_all_customer_manifests_by_id_with_history":
            return this.api_root + "/ccsaa-api-v1/get_all_customer_manifests_by_id_with_history/" + data.id;
            break;
        case "get_all_history_for_manifest_cust":
            return this.api_root + "/ccsaa-api-v1/get_all_history_for_manifest_cust/" + data.id;
            break;

        case "get_countries_map":
            return this.api_root + "/ccsaa-api-v1/countries_map";
            break;
            
            
            
            


    /**OLD */


            //retrieveing all registered centers
        case "get_all_centers":
            return this.api_root + "api/get_all_centers";
            break;
        case "search_center":
            return this.api_root + "api/seach_center?key=" + data.key;
            break;
        case "get_center_configs":
            return this.api_root + "api/get_center_configs?name=" + data.name;

            break;
            //get list of menu from a given center
        case "get_center_menu":
            return this.api_root + "api/get_center_menu?name=" + data.name + "&cat=" + data.cat;
            break;
            //put an order to the given center
        case "put_an_order":
            return this.api_root + "api/put_an_order/";
            break;

        default:
            return "";
    };
};