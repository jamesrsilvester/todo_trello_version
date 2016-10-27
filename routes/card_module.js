var fs = require("fs"),
    path = require("path"),
    _ = require("underscore"),
    file_path = path.resolve(path.dirname(__dirname), "data/cards.json");

var Cards = {
  getCard: function(card_id) {
    return _.findWhere(this.get(), {id: card_id});
  },
  delete: function(card_id) {
    var cards = this.get(),
        card = _.findWhere(cards, {id: card_id}),
        card_idx = cards.indexOf(card);;

    cards.splice(card_idx, 1);
    this.set(cards);
  },
  setListTitle: function(list) {
    var cards = this.get(),
        matched_cards = _.find(cards, {id: list.id});

    matched_cards.forEach(function(card) {
      card.list_title = list.title;
    });

    this.set(cards);
  },
  update: function(input_card) {
    var cards = this.get(),
        card = _.findWhere(cards, {id: input_card.id});

    for (var prop in input_card) {
      card[prop] = input_card[prop];
    }

    this.set(cards);
  },
  new: function(card) {
    var cards = this.get();

    cards.push(card);
    this.set(cards);
  },
  get: function() {
    return JSON.parse(fs.readFileSync(file_path), "utf8").data;
  },
  set: function(cards) {
    fs.writeFileSync(file_path, JSON.stringify({ data: cards }), "utf8");
  }
};

module.exports = Cards;