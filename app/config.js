var requirejs = require('requirejs');

//@ifndef TEST_PRE
console.log('macro was defined');
//@endif

requirejs.config({
   //Pass the top-level main.js/index.js require
   //function to requirejs so that node modules
   //are loaded relative to the top-level JS file.
   nodeRequire: require,
   modules: [
      //Just specifying a module name means that module will be converted into
      //a built file that contains all of its dependencies. If that module or any
      //of its dependencies includes i18n bundles, they may not be included in the
      //built file unless the locale: section is set above.
      {
         name: "main",

         //create: true can be used to create the module layer at the given
         //name, if it does not already exist in the source location. If
         //there is a module at the source location with this name, then
         //create: true is superfluous.
         create: true,
      }
   ]
});
