// Filename: router.js
define([
	'jQuery',
	'Underscore',
	'Backbone',
	'io'
	], function($, _, Backbone, io){
		var AppRouter = Backbone.Router.extend({
			routes: {
				""				: 	"home",
				"about"			: 	"about"
			},
			home: function() {
				console.log('Home Route');
			},
			about: function(){
				console.log('About Route')
			}

		});

		var initialize = function(){
			var vent = _.extend({}, Backbone.Events);

			var socket = io.connect('http://localhost');
			socket.on('news', function (data) {
				console.log(data);
				socket.emit('my other event', { my: 'data' });
			});
			
			var app_router = new AppRouter();
			Backbone.history.start({pushState: true});
			vent.bind('navClick', function(loc) {
				app_router.navClick.call(app_router, loc);
			});
		};
		return { 
			initialize: initialize
		};
	});