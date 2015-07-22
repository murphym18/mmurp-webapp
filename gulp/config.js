var path =  require('path');
module.exports = {
  "app-directory": path.resolve(__dirname, '../app'),
  "tmp-directory": path.resolve(__dirname, "../tmp"),
  "out-directory": path.resolve(__dirname, "../out"),
  "pub-directory": path.resolve(__dirname, "../public"),
  "app-name": "mmurp.co",
  "app-description": "Coming soon...",
  "sass-config": {
    "style": "compressed",
    "loadPath": [
      "app/sass",
      "bower_components/bootstrap-sass-official/assets/stylesheets",
      "bower_components/fontawesome/scss"
    ]
  }
}
