var requirejs = require('requirejs');

//@ifdef TEST_PRE
console.log('macro was defined');
//@endif

requirejs.config({
   //Pass the top-level main.js/index.js require
   //function to requirejs so that node modules
   //are loaded relative to the top-level JS file.
   nodeRequire: require,
   path: {}
});
