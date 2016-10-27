var fs = require("fs"),
    path = require("path"),
    _ = require("underscore"),
    file_path = path.resolve(path.dirname(__dirname), "data/lists.json"),
    Cards = require(path.resolve(path.dirname(__dirname), "routes/card_module"));

var Lists = {
  setListTitle: function(id, title) {
    var lists = this.get(),
        list = _.findWhere(lists, { id: id });

    list.title = title;
    Cards.setListTitle(list);
    this.set(this.getLastListID(), this.getLastCardID(), lists);
  },
  deleteCard: function(card_id) {
    var lists = this.get(),
        card = Cards.getCard(card_id),
        list = _.findWhere(lists, { id: card.list_id }),
        card_idx = list.card_ids.indexOf(card);

    list.card_ids.splice(card_idx, 1);
    Cards.delete(card_id);
    this.set(this.getLastListID(), this.getLastCardID(), lists);
  },
  copyCard: function(dest, card_id) {
    var lists = this.get(),
        card = Cards.getCard(card_id),
        cards = _.findWhere(lists, { id: card.list_id }).cards,
        card_idx = cards.indexOf(card.id),
        dest_list = _.findWhere(lists, { id: +dest.list_id }),
        current_last_id = this.getLastCardID() + 1;

    if (!"keep_comments" in dest) { card.comments = []; }
    card.title = dest.title;
    card.id = current_last_id;

    dest_list.card_ids.splice(+dest.card_position - 1, 0, card.id);
    card.list_id = +dest.list_id;
    card.list_title = dest_list.title;

    Cards.new(card);
    this.set(this.getLastListID(), current_last_id, lists);
    return card;
  },
  newCard: function(card) {
    var lists = this.get(),
        list = _.findWhere(lists, { id: +card.list_id }),
        current_last_id = this.getLastCardID() + 1;

    card.id = current_last_id;
    card.list_id = +card.list_id;
    card.comments = [];
    list.card_ids.push(card.id);

    Cards.new(card);
    this.set(this.getLastListID(), current_last_id, lists);
    return card;
  },
  newList: function(list) {
    var lists = this.get(),
        current_last_id = this.getLastListID() + 1;

    list.id = current_last_id;
    list.card_ids = [];
    lists.push(list);
    this.set(current_last_id, this.getLastCardID(), lists);
    return list;
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