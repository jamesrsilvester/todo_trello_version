var ListView = Backbone.View.extend({
  template: App.templates.list,
  attributes: {
    class: "list"
  },
  events: {
    "change .list-header textarea": "editListTitle",
    "keydown .list-header textarea": "blurListTitle",
    "mouseup a.card-composer" : "newCard",
    "click a.close_edit_description": "closeEditDescription",
    "click .card-new input[type='submit']": "createCard",
    "click .card-new a": "closeNewCard"
  },
  closeNewCard: function(e) {
    e.preventDefault();
    $(e.target).closest(".card-new").hide();
    this.$el.find(".card-composer").show();
  },
  createCard: function(e) {
    e.preventDefault();
    var $textarea = $(e.target).parent().prev().find("textarea"),
        card_title = $textarea.val(),
        self = this,
        new_card;

    if (!card_title) {
      $textarea.focus();
      return;
    } else {
      new_card = new Card({
        title: card_title,
        list_title: this.model.toJSON().title,
        list_id: this.model.toJSON().id,
        description: ""
      });
    }

    $.ajax({
      url: "/card/new",
      type: "post",
      data: new_card.toJSON(),
      success: function(json) {
        App.cards.add(json);
        self.model.toJSON().card_ids.push(json.id);
        App.indexView();
      }
    });
  },
  newCard: function(e) {
    e.preventDefault();
    var new_card_panel;

    $(".card-new").hide();
    $(".card-composer").show();

    new_card_panel = this.$el.find(".card-new").appendTo(this.$el.find(".list-cards")).show();
    new_card_panel.find("textarea").focus();
    $(e.target).hide();
  },
  blurListTitle: function(e) {
    if (e.keyCode == 13) { $(e.target).blur(); }
  },
  editListTitle: function(e) {
    var new_title = $(e.target).val().trim(),
        id = $(e.target).closest(".list").attr("id").replace("list_", "");
    if (new_title === this.model.toJSON().title) { return; }

    this.model.set({ title: new_title });

    $.ajax({
      url: "/list/edit",
      type: "post",
      data: {
        title: new_title,
        id: id
      }
    });
  },
  render: function() {
    var id = this.model.get("id");

    this.$el.attr("id", "list_" + id);
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.prependTo(App.$el.find(".lists"));
  },
  initialize: function() {
    this.render();
    this.model.view = this;
  }
});