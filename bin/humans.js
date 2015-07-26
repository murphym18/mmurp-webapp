var moment = require('moment')
var json = JSON.stringify({now: moment().format('MMMM DD, YYYY')});
process.stdout.write(json);
