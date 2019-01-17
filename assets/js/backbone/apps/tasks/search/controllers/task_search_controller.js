
var _ = require('underscore');
var Backbone = require('backbone');

var Bootstrap = require('bootstrap');
var TasksCollection = require('../../../../entities/tasks/tasks_collection');
var TaskModel = require('../../../../entities/tasks/task_model');
var TaskListView = require('../views/task_search_view');
var InternshipListView = require('../views/internship_search_view');

TaskController = Backbone.View.extend({
  events: {
    'click .add-opportunity' : 'add',
  },

  initialize: function (options) {
    this.options = options;
    var hiringPath = window.cache.currentUser ? window.cache.currentUser.hiringPath : '';
    if (hiringPath == 'student' && this.options.action != 'internships') {
      Backbone.history.navigate('/search/internships', { trigger: true, replace: true });
    } else if (this.options.action == 'internships') {
      this.taskListView = new InternshipListView({
        collection: new TasksCollection(),
        el: this.el,
        queryParams: this.options.queryParams,
      }).render();
    } else {
      this.taskListView = new TaskListView({
        collection: new TasksCollection(),
        el: this.el,
        queryParams: this.options.queryParams,
      }).render();
    }
  },

  add: function (e) {
    Backbone.history.navigate('/tasks/create', { trigger: true });
  },

  show: function (e) {
    if (e.preventDefault) e.preventDefault();
    var projectId = $(e.currentTarget).data('projectid'),
        taskId    = $(e.currentTarget).data('id');

    if (taskId == 'null') { return; }

    Backbone.history.navigate('tasks/' + taskId, { trigger: true }, taskId);
  },

  cleanup: function () {
    this.taskListView && this.taskListView.cleanup();
    removeView(this);
  },

});

module.exports = TaskController;
