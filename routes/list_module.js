var fs = require("fs"),
    path = require("path"),
    _ = require("underscore"),
    file_path = path.resolve(path.dirname(__dirname), "data/lists.json");

var Lists = {
  deleteCard: function(card_id) {
    var lists = this.get(),
        card = this.getCard(this.get(), card_id),
        list = _.findWhere(lists, { id: card.list_id }),
        card_idx = list.cards.indexOf(card);

    list.cards.splice(card_idx, 1);
    this.set(this.getLastListID(), this.getLastCardID(), lists);
  },
  copyCard: function(dest, card_id) {
    var lists = this.get(),
        card = this.getCard(this.get(), card_id),
        cards = _.findWhere(lists, { id: card.list_id }).cards,
        card_idx = cards.indexOf(card),
        dest_list = _.findWhere(lists, { id: +dest.list_id }),
        current_last_id = this.getLastCardID() + 1;

    if (!"keep_comments" in dest) { card.comments = []; }
    card.title = dest.title;
    card.id = current_last_id;

    dest_list.cards.splice(+dest.card_position - 1, 0, card);
    card.list_id = +dest.list_id;
    card.list_title = dest_list.title;

    this.set(this.getLastListID(), current_last_id, lists);
    return card;
  },
  getCard: function(lists, card_id) {
    var all_cards = lists.map(function(list) { return list.cards; });
    all_cards = [].concat.apply([], all_cards);

    return _.findWhere(all_cards, {id: card_id});
  },
  setCard: function(input_card) {
    var lists = this.get(),
        card = this.getCard(lists, input_card.id);

    for (var prop in input_card) {
      card[prop] = input_card[prop];
    }

    this.set(this.getLastListID(), this.getLastCardID(), lists);
  },
  newCard: function(card) {
    var lists = this.get(),
        list = _.findWhere(lists, { id: +card.list_id }),
        current_last_id = this.getLastCardID() + 1;

    card.id = current_last_id;
    card.list_id = +card.list_id;
    card.comments = [];
    list.cards.push(card);

    this.set(this.getLastListID(), current_last_id, lists);
    return card;
  },
  newList: function(list) {
    var lists = this.get(),
        current_last_id = this.getLastListID() + 1;

    list.id = current_last_id;
    list.cards = [];
    lists.push(list);
    this.set(current_last_id, this.getLastCardID(), lists);
    return list;
  },
  setListTitle: function(id, title) {
    var lists = this.get(),
        list = _.findWhere(lists, { id: id });

    list.title = title;
    this.set(this.getLastListID(), this.getLastCardID(), lists);
  },
  get: function() {
    return JSON.parse(fs.readFileSync(file_path), "utf8").data;
  },
  set: function(last_list_id, last_card_id, lists) {
    fs.writeFileSync(file_path, JSON.stringify({ last_list_id: last_list_id, last_card_id: last_card_id, data: lists }), "utf8");
  },
  getLastListID: function() {
    return JSON.parse(fs.readFileSync(file_path), "utf8").last_list_id;
  },
  getLastCardID: function() {
    return JSON.parse(fs.readFileSync(file_path), "utf8").last_card_id;
  }
};

module.exports = Lists;