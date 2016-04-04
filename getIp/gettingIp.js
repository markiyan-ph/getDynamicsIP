var nodemailer = require('nodemailer');
var fs = require('fs');

function sendMail(ip) {

    // read data line by line from file credentials.txt
    var credentials = fs.readFileSync(__dirname + '/credentials.txt').toString().split("\n");

    var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: credentials[0],
            pass: credentials[1]
        }
    };
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport(smtpConfig);

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Oksana" <' + credentials[0] + '>', // sender address
        to: 'markiyan.ph@gmail.com', // list of receivers
        subject: 'IP', // Subject line
        text: '' + ip + '', // plaintext body
        html: '<b>' + ip + '</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

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
                sendMail(result.value);
            }
        })
        .pause(3000)
        .end();
    }
};