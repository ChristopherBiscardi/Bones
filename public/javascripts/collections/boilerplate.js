define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/myAwesomeModel'
], function($, _, Backbone, myModel){
  var myCollection = Backbone.Collection.extend({
    model: myModel,
    initialize: function(){

    }

  });
 
  return new myCollection();
});