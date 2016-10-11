var IndexView = Backbone.View.extend({
  attributes: {
    id: "board"
  },
  template: App.templates.index,
  events: {
    "click .list-composer span": "newList",
    "click a.icon_close": "closeNewList",
    "submit": "createList"
  },
  createList: function(e) {
    e.preventDefault();
    var $f = this.$("form");

    if ($f.serialize() === "title=") {
      $(e.target).find("[type='text']").focus();
      return;
    }

    $.ajax({
      url: $f.attr("action"),
      type: $f.attr("method"),
      data: $f.serialize(),
      success: function(json) {
        App.lists.add(json);
        App.indexView();
      }
    });
  },
  closeNewList: function(e) {
    e.preventDefault();
    $(e.target).closest("form").hide().prev("span").show();
  },
  newList: function(e) {
    var $f = $(e.target).hide().next("form").show();
    $f.find("input[type='text']").focus();
  },
  render: function() {
    this.$el.html(this.template(App.lists));
    App.$el.html(this.$el);
  },
  initialize: function() {
    this.render();
  }
});