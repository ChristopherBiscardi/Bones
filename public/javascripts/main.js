require.config({
  paths: {
    jQuery: 'lib/def/jquery',
    Underscore: 'lib/def/underscore',
    Backbone: 'lib/def/backbone',
		io: 'lib/def/socket.io',
		templates: 'lib/def/templates',
  }

});

require([
  'app',
  'order!jQuery',
  'order!Underscore',
  'order!Backbone',
  'templates',
  'io'
], function(App){
	//TODO: Modernizr Figure out a solution for modernizr
  App.initialize();
});
