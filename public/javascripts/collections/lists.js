var Lists = Backbone.Collection.extend({
  model: List,
  getAllCards: function() {
    var cards = this.toJSON().map(function(list) { return list.cards; });
    return [].concat.apply([], cards);
  },
  getCard: function(card_id) {
    return this.getAllCards().find(function(card) { return card.id === card_id; });
  },
  dragList: function(list, list_idx) {
    this.remove(list);
    this.add(list, { at: list_idx });
    this.save();
  },
  dragCard: function(list, card, card_idx) {
    this.removeCard(card);
    card.list_id = list.id;
    card.list_title = list.title;
    list.cards.splice(card_idx, 0 , card);
    this.save();
  },
  removeCard: function(card) {
    var list = this.get(card.list_id),
        card_idx = list.toJSON().cards.indexOf(card);

    if (card_idx > -1) { list.toJSON().cards.splice(card_idx, 1); }
  },
  save: function() {
    $.ajax({
      url: "/lists",
      type: "post",
      data: { data: JSON.stringify(this.toJSON()) },
      success: function(json) {}
    });
  }
});