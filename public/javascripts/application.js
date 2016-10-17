var App = {
  templates: JST,
  $el: $("main"),
  indexView: function() {
    this.index = new IndexView();
    this.renderLists();
    this.bindEvents();
  },
  renderLists: function() {
    _.each(this.lists.last(this.lists.length).reverse(), this.renderListView);
  },
  renderListView: function(list) {
    new ListView({
      model: list
    });
  },
  renderEditCard: function(card_id) {
    var card = this.lists.getCard(+card_id);

    new EditCardView({
      model: card
    });
  },
  dragDropSort: function() {
    this.$el.find("div.lists").dragDropSort({
      target: "div.list",
      axis: "x",
      cloneStyle: {
        "background-color": "#026AA7"
      },
      up: this.dragList
    });

    this.$el.find(".list").dragDropSort({
      target: "div.list-card",
      up: this.dragCard
    });
  },
  dragList: function(list_id) {
    var list = App.lists.get(list_id),
        list_idx = $.makeArray($(".list"))
                    .findIndex(function(list, idx) {
                      if ($(list).attr("id") === "list_" + list_id) {
                        return list;
                      }
                    });

    if (App.lists.at(list_idx) === list) { return; }
    App.lists.dragList(list, list_idx);
  },
  dragCard: function(card_id) {
    var list_id = +$(this).closest(".list").attr("id").replace("list_", ""),
        list = App.lists.get(list_id).toJSON(),
        card = App.lists.getCard(card_id),
        card_idx = App.findCardIdx(card);

    if (list_id === card.list_id && list.cards.indexOf(card) === card_idx) { return; }
    App.lists.dragCard(list, card, card_idx);
  },
  findCardIdx: function(input_card) {
    var card_idx = $.makeArray($("#list_" + input_card.list_id).find(".list-card"))
                    .filter(function(card, idx) { return $(card).attr("id"); })
                    .findIndex(function(card, idx) {
                      if ($(card).attr("id") === "card_" + input_card.id) {
                        return card;
                      }
                    });
    return card_idx;
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.dragDropSort();
  }
};

Handlebars.registerHelper("formatDate", function(due_date, due_time) {
  var date = new Date(due_date.split("/").join(", ")).toDateString().split(" "),
      this_year = new Date().toFullYear,
      format = date.slice(1, 3).join(" ");

  if (+date[3] !== this_year) { format += ", " + date[3]; }
  format += " at " + due_time;

  return format;
});

Handlebars.registerHelper("tomorrow", function(id) {
  var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      date = tomorrow.getDate(),
      month = tomorrow.getMonth() + 1,
      year = tomorrow.getFullYear();

  date = date > 9 ? date : "0" + date;
  month = (month + 1 > 9) ? month : "0" + month;

  return (month + "/" + date + "/" + year);
});

Handlebars.registerHelper("card_position", function(id) {
  var card = App.lists.getCard(id),
      card_idx = App.findCardIdx(card);

  return (card_idx + 1);
});

Handlebars.registerHelper("card_addtional_position", function(list_id) {
  var cards = App.lists.get(list_id).toJSON().cards;

  return (cards.length + 1);
});

Handlebars.registerHelper("each_card_position", function(list_id, card_id){
  var cards = App.lists.get(list_id).toJSON().cards,
      card = App.lists.getCard(card_id),
      card_idx = App.findCardIdx(card),
      new_card_position = cards.length + 1,
      options = "";

  for (var i = 1; i <= cards.length; i++) {
    if (i === card_idx + 1) {
      options = options + "<option value='" + i + "' selected>" + i + " (current)" + "</option>";
    } else {
      options = options + "<option value='" + i + "'>" + i + "</option>";
    }
  }

  return options;
});

Handlebars.registerHelper("each_list_title", function(list_title){
  var lists = App.lists.toJSON(),
      options = "";

  lists.forEach(function(list) {
    if (list.title === list_title) {
      options = options + "<option value='" + list.id + "' list-id='" + list.id + "' selected>" + list.title + " (current)" + "</option>";
    } else {
      options = options + "<option value='" + list.id + "' list-id='" + list.id + "'>" + list.title + "</option>";
    }
  });

  return options;
});