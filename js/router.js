
App.Router.map(function() {});

App.IndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {

    var objects = App.TimetableRaw.map(function(obj) {
      obj.close_at = moment(obj.close_at).subtract(4, 'hours').toDate();//костыль с временными зонами(Z),
      obj.open_at = moment(obj.open_at).subtract(4, 'hours').toDate();//нужно фиксить
      return Em.Object.create(obj);
    });

    var records = Ember.ArrayProxy.create({
      content: Ember.A(objects)
    });

    controller.set('records', records);
  }
});


