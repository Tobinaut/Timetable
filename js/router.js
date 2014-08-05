App.Router.map(function() {
  this.resource('timetable', { path: '/' });
});

App.TimetableRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('records', this.store.find('timetable'));
  }
});