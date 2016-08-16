var fs = require('fs');
var path = __dirname;

var credentials = fs.readFileSync(path + '/credentials.txt').toString().split("\n");

console.log("user: " + credentials[0] + "\n" + "pass: " + credentials[1]);
