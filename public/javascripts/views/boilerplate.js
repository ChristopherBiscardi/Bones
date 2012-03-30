define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/my/myModel'
], function($, _, Backbone, appModel){
	
	var myView = Backbone.View.extend({
		el: $('body'),
		initialize: function(args) {
			this.model = new myModel();
		},
		events: function() {
		},
		render: function() {
			return this;
		}
	});
return new myView();
});