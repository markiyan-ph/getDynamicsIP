var nodemailer = require('nodemailer');
var fs = require('fs');

function showIp(ip) {

    // show ip from "www.whatismyip.com"
    console.log("======= IP =======")
    console.log(ip);
    console.log("==================")


}

module.exports = {
    // www.whatismyip.com
    'Get IP from whatismyip.com' : function (browser) {
        browser
        .url('http://www.whatismyip.com')
        .waitForElementVisible('body', 1000)
        .waitForElementVisible('#ip-box .ip div', 1000)
        .execute(function() {
            var ip = jQuery('#ip-box .ip > div').children().text();                
            return ip;  
        }, [], function(result) {
            // console.log(result);
            if(result.state === 'success') {
                showIp(result.value);
            }
        })
        .pause(3000)
        .end();
    }
};
