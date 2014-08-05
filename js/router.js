
App.Router.map(function() {});

App.IndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {

    var objects = App.TimetableRaw.map(function(obj) {
      return Em.Object.create(obj);
    });

    var records = Ember.ArrayProxy.create({
      content: Ember.A(objects)
    });

    controller.set('records', records);
  }
});


