
/**
 * Module dependencies.
 */

var express = require('express')
  , app = express.createServer()
  , io = require('socket.io').listen(app)
  //MongoDB session
  , mongoStore = require('connect-mongodb')
  , Db = require('mongodb').Db
  , Server = require('mongodb').Server
  , server_config = new Server('localhost', 27017, {auto_reconnect: true, native_parser: true})
  , db = new Db('sessions', server_config, {})
  , mongo_store = new mongoStore({db: db, reapInterval: 3000}) // check every 3 seconds
  , parseCookie = require('connect').utils.parseCookie
  //MongoDB via Mongolian
  , Mongolian = require("mongolian")
  , server = new Mongolian()
  , dba = server.db("__myApp__")
  , users = dba.collection("users")
  //MongoDB Data Types
  , ObjectId =  require('mongolian').ObjectId
  //Utils
  , routes = require('./routes')
  , _ = require('underscore');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({cookie: {maxAge: 315569259747}, store: mongo_store, secret: 'ZheWorldzDominati0n!'}));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000);

console.log("Bones listening on port %d in %s mode", app.address().port, app.settings.env);

io.sockets.on('connection', function (socket) {
  var hs = socket.handshake;
  console.log('A socket with sessionID ' + hs.sessionID + ' connected!');

  socket.join(hs.sessionID);

  socket.on('hello', function(data) {
    console.log('hello');
  });

  socket.on('disconnect', function () {
    console.log('A socket with sessionID ' + hs.sessionID + ' disconnected!');
  });

});
io.set('authorization', function (data, accept) {
  if (data.headers.cookie) {
    //console.log(data);
    data.cookie = parseCookie(data.headers.cookie);
    data.sessionID = data.cookie['connect.sid'];
    // (literally) get the session data from the session store
    mongo_store.get(data.sessionID, function (err, session) {
      if (err) {
        // if we cannot grab a session, turn down the connection
        accept(err.message, false);
      } else {
        // save the session data and accept the connection
        data.session = session;
        accept(null, true);
      }
    });
  } else {
    return accept('No cookie transmitted.', false);
  }
});
