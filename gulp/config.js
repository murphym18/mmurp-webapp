var path = require('path');
console.log(require.resolve());
module.exports = {
   "app-name": "mmurp.co",
   "app-description": "Coming soon...",
   "app-directory": path.resolve(__dirname, '../app'),
   "tmp-directory": path.resolve(__dirname, "../tmp"),
   "out-directory": path.resolve(__dirname, "../out"),
   "pub-directory": path.resolve(__dirname, "../public"),
   "common-libs": [
      'jquery',
      'bootstrap-sass',
      'underscore',
      'backbone',
      'backbone.marionette',
      'backbone.radio'
   ]
}
