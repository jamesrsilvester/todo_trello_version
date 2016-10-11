var router = new (Backbone.Router.extend({
  edit: function(card_id) {
    App.indexView();
    App.renderEditCard(card_id);
  },
  index: function() { App.indexView(); },
  initialize: function() {
    this.route(/^\/?$/, "index", this.index);
    this.route("card/edit/:card_id", "edit", this.edit);
  }
}))();

Backbone.history.start({
  pushState: true
});

$(document).on("click", "a[href^='/']", function(e) {
  e.preventDefault();
  router.navigate($(e.currentTarget).attr("href").replace(/^\//, ""), { trigger: true });
});
