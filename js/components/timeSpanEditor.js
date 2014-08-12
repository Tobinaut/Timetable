App.TimeSpanEditorComponent = Ember.Component.extend({
  actions: {
    deleteSpan: function(day) {
      var obj = this.get('timetable');
      this.get('timetables').removeObject(obj);
    }
  },

  canBeDeleted: false,

  canBeDeleted: function() {
    return this.get('day.length') > 1;
  }.property()
});