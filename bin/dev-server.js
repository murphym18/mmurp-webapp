var broccoli = require('broccoli');
var Watcher = require('broccoli/lib/watcher')
var middleware = require('broccoli/lib/middleware')
var http = require('http')
var connect = require('connect')
var socketio = require('socket.io');
var spawn = require('child_process').spawn;
exports.serve = serve

function serve(builder, options) {
   options = options || {}
   var server = {}

   console.log('Serving on http://' + options.host + ':' + options.port + '\n')

   server.watcher = options.watcher || new Watcher(builder, {
      verbose: true
   })

   server.app = connect().use(middleware(server.watcher))

   server.http = http.createServer(server.app)
   server.io = socketio(server.http);
   // We register these so the 'exit' handler removing temp dirs is called
   function cleanupAndExit() {
      builder.cleanup().catch(function(err) {
         console.error('Cleanup error:')
         console.error(err && err.stack ? err.stack : err)
      }).finally(function() {
         process.exit(1)
      })
   }

   process.on('SIGINT', cleanupAndExit)
   process.on('SIGTERM', cleanupAndExit)

   server.watcher.on('change', function(results) {
      server.io.emit('message');
      console.log('Built - ' + Math.round(results.totalTime / 1e6) +
         ' ms @ ' + new Date().toString())
   })

   server.watcher.on('error', function(err) {
      console.log('Built with error:')
         // Should also show file and line/col if present; see cli.js
      if (err.file) {
         console.log('File: ' + err.file)
      }
      console.log(err.stack)
      console.log('')
   })

   server.watcher.once('change', function() {
      var child = spawn('chrome', ['http://localhost:' + String(options.port) +
         '/'
      ], {
         detached: true,
         stdio: ['ignore', 'ignore', 'ignore']
      });

      child.unref();
   });

   server.http.listen(parseInt(options.port, 10), options.host);

   return server
}

var server = serve(getBuilder(), getOptions());
server.watcher.on('change', function(results) {
   console.log('Built - ' + Math.round(results.totalTime / 1e6) +
      ' ms @ ' + new Date().toString())
})

function getBuilder() {
   var tree = broccoli.loadBrocfile()
   return new broccoli.Builder(tree);
}

function getOptions(builder) {
   var options = {};
   options.port = 8080;
   options.host = "localhost";
   return options;
}
