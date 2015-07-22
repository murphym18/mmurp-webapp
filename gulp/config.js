var path =  require('path');
module.exports = {
  "app-directory": path.resolve(__dirname, '../app'),
  "tmp-directory": path.resolve(__dirname, "../tmp"),
  "out-directory": path.resolve(__dirname, "../out"),
  "pub-directory": path.resolve(__dirname, "../public"),
  "app-name": "mmurp.co",
  "app-description": "Coming soon...",
  "babel-src-globs": [
    "app/**/*.js"
  ],
  "babel-config": {
    "modules": "amd",
    "stage": 0,
    "ignore": "app/config.js"
  },
  "preprocessor-config": {
    "context": {
      "TEST_PRE": true
    }
  },
  "sass-src-globs": [
    "app/sass/index.sass"
  ],
  "sass-config": {
    "style": "compressed",
    "loadPath": [
      "app/sass",
      "bower_components/bootstrap-sass-official/assets/stylesheets",
      "bower_components/fontawesome/scss"
    ]
  },
  "requirejs-config": {
    "name": "main",
    "allowSourceOverwrites": true,
    "keepBuildDir": true,
    "optimize": "none",
    "mainConfigFile": "config.js",
    "out": "../{{out-directory}}/build.js"
  }
}
