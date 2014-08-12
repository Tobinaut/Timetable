var LOWER_TIME_BOUND = moment({y: 2000, M: 0, d: 1, h: 0, m: 0, s: 0, ms: 0});
  LOWER_TIME_BOUND = LOWER_TIME_BOUND.toDate();
var UPPER_TIME_BOUND = moment({y: 2000, M: 0, d: 1, h: 23, m: 59, s: 59, ms: 999});
  UPPER_TIME_BOUND = UPPER_TIME_BOUND.toDate();

App.TimeEditorComponent = Ember.Component.extend({
  actions: {
    acceptChanges: function() {
      var value = this.get('timeInput');
      var current_time = moment(this.get('timeInput'), 'HH:mm');
      current_time.year(2000);
      current_time.month(0);
      current_time.dayOfYear(1);
      if(this.get('availableTimeValues').contains(value))
        this.set('time', current_time.toDate());
      else
        this.set('timeInput', this.get('formattedTime'));
      this.set('dropdownVisible', false);//set dropdown unvisible
    },

    pickTime: function(time) {
      var current_time = moment(time, 'HH:mm');
      current_time.year(2000);
      current_time.month(0);
      current_time.dayOfYear(1);
      this.set('timeInput', time);
      this.set('time', current_time.toDate());
      this.set('dropdownVisible', false);//set dropdown unvisible
      // console.log(this.get('lowerTimeBound'));
      // console.log(this.get('upperTimeBound'));
    },

    setDropdownVisible: function() {
      this.set('dropdownVisible', true);
    },

    setDropdownUnVisible: function() {
      // console.log(this.get('lowerTimeBound'));
      // console.log(this.get('upperTimeBound'));
      var self = this;
      setTimeout(function() {
        self.set('dropdownVisible', false);
      }, 100);
    }
  },
  v1: 'aaaa',
  v2: true,
  //
  //suggection list properties
  //
  lowerTimeBound: LOWER_TIME_BOUND,
  upperTimeBound: UPPER_TIME_BOUND,

  lowerTimeBound: function() {
    var timetable = this.get('timetable');
    var day = this.get('day');
    if(this.get('flag') === 'from')
      if(day.objectAt(day.indexOf(timetable) - 1) === undefined)
        return LOWER_TIME_BOUND;
      else
        return moment(day.objectAt(day.indexOf(timetable) - 1).close_at).add(this.get('granulation'), 'm').toDate();
    else//to
    {
       return moment(timetable.open_at).add(this.get('granulation'), 'm').toDate();
      }
  }.property('time', 'pickTime', 'dropdownVisible'),

  upperTimeBound: function() {
    var timetable = this.get('timetable');
    var day = this.get('day');
    if(this.get('flag') === 'to')
      if(day.objectAt(day.indexOf(timetable) + 1) === undefined)
        return UPPER_TIME_BOUND;
      else
        return moment(day.objectAt(day.indexOf(timetable) + 1).open_at).toDate();
    else//from
    {
      return moment(timetable.close_at).toDate();
    }

  }.property('time', 'pickTime', 'dropdownVisible'),

  availableTimeValues: function() {
    var timeIntervals = [];
    var today = moment(this.get('lowerTimeBound'));
    while(today.isBefore(moment(this.get('upperTimeBound')))) {
      timeIntervals.push(moment(today).format('HH:mm'));
      today = today.add(this.get('granulation'), 'm');
    }
    return timeIntervals;
  }.property('lowerTimeBound', 'upperTimeBound', 'granulation'),


  suggestionList: function() {
    var timeInput = this.get('timeInput');
    return this.get('availableTimeValues')
    .filter(function(item, index, enumerable){
      return item.indexOf(timeInput) != -1;
    });
  }.property('timeInput', 'availableTimeValues'),
  //
  //input properties
  //
  formattedTime: function() {
    var time = moment(this.get('time'));
    return time.format('HH:mm');


  }.property('time'),

  timeInput: Ember.computed.oneWay('formattedTime'),
  //
  //dropdown properties
  //

  dropdownVisible: false

});