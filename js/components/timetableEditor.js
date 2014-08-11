App.TimetableEditorComponent = Ember.Component.extend({
  actions: {
    addSpan: function(day) {
      var newTimetable = Em.Object.create({
        open_at: '2000-01-01T23:30:00',
        close_at: '2000-01-01T23:59:00',
        day: day,
        date: null,
        is_working: true
      });
      this.get('timetables').pushObject(newTimetable);
    },
  },

  timetables: null,

  timetableSize: (function() {
    return this.get('timetables.length');
  }).property('timetables.@each'),

  sortedTimetables: (function () {
    var resArr = Em.ArrayProxy.create({
      content: []
    });

    for(var i = 0; i < 7; i++)
      resArr.pushObject(Em.ArrayProxy.create({
        content: []
      }));

    this.get('timetables').forEach(function(t) {
      resArr.objectAt(t.get('day')).pushObject(t);
    });
    return resArr;
  }).property('timetables.@each')
});