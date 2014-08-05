App.TimetableEditorComponent = Ember.Component.extend({
  actions: {
    addSpan: function() {
      //
      // Сделать через Ember.ArrayProxy::pushObject()
      //
      var timetables = this.get('timetables');

      var timetable = this.get('targetObject.store').createRecord('timetable', {
        open_at: '',
        close_at: '',
        day: this.get('timetables').get('day'),
        date: null,
        is_working: true
      });

    }
  },

  timetables: null,

  timetableSize: (function() {
    return this.get('timetables.length');
  }).property('timetables.@each'),

  sortedTimetables: (function () {
    var resArr = new Array();
    for(var i = 0; i < 7; i++)
        resArr[i] = new Array();
    this.get('timetables').forEach(function(t) {

      resArr[t.get('day')].push(t);
    });
    return resArr;
  }).property('timetables.@each')
});