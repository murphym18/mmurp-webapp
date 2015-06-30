({
   //The top level directory that contains your app. If this option is used
   //then it assumed your scripts are in a subdirectory under this path.
   //This option is not required. If it is not specified, then baseUrl
   //below is the anchor point for finding things. If this option is specified,
   //then all the files from the app directory will be copied to the dir:
   //output area, and baseUrl will assume to be a relative path under
   //this directory.
   //appDir: "dist/",

   //By default, all modules are located relative to this path. If baseUrl
   //is not explicitly set, then all modules are loaded relative to
   //the directory that holds the build file. If appDir is set, then
   //baseUrl should be specified as relative to the appDir.
   baseUrl: "./dist",

   //By default all the configuration for optimization happens from the command
   //line or by properties in the config file, and configuration that was
   //passed to requirejs as part of the app's runtime "main" JS file is *not*
   //considered. However, if you prefer the "main" JS file configuration
   //to be read for the build so that you do not have to duplicate the values
   //in a separate configuration, set this property to the location of that
   //main JS file. The first requirejs({}), require({}), requirejs.config({}),
   //or require.config({}) call found in that file will be used.
   //As of 2.1.10, mainConfigFile can be an array of values, with the last
   //value's config take precedence over previous values in the array.
   mainConfigFile: 'dist/config.js',
   name: "main",

   //The directory path to save the output. If not specified, then
   //the path will default to be a directory called "build" as a sibling
   //to the build file. All relative paths are relative to the build file.
   out: "./dist/build.js",


   //Introduced in 2.1.11. As part of fixing a bug to prevent possible
   //overwrites of source code, https://github.com/jrburke/r.js/issues/444,
   //it prevented some cases where generated source is used for a build, and
   //it was OK to overwrite content in this source area as it was generated
   //from another source area, and not allowing source overwrites meant taking
   //another file copy hit. By setting this to true, it allows this sort of
   //source code overwriting. However, use at your own risk, and be sure you
   //have your configuration set correctly. For example, you may want to
   //set "keepBuildDir" to true.
   allowSourceOverwrites: true,
   keepBuildDir: true,
   optimize: "none",

})
