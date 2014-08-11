App.TimetableEditorComponent = Ember.Component.extend({
  actions: {
    addSpan: function(day) {
      var today = this.get('sortedTimetables').objectAt(day);
      var open_at = moment(today.get('lastObject').close_at).add(15, 'm');
      var newTimetable = Em.Object.create({
        open_at: open_at,
        close_at: '2000-01-01T23:59:00',
        day: day,
        date: null,
        is_working: true
      });
      if(moment(today.get('lastObject').close_at).isBefore(moment('2000-01-01T23:59:00')))
        this.get('timetables').pushObject(newTimetable);
    },
  },

  timetables: null,

  granulation: 30, //minutes

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