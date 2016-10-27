var Lists = Backbone.Collection.extend({
  model: List,
  dragList: function(list, list_idx) {
    this.remove(list);
    this.add(list, { at: list_idx });
    this.save();
  },
  dragCard: function(list, card, card_idx) {
    this.removeCardId(card);
    card.list_id = list.id;
    card.list_title = list.title;
    list.card_ids.splice(card_idx, 0 , card.id);
    this.save();
  },
  removeCardId: function(card) {
    var list = this.get(card.list_id),
        card_idx = list.toJSON().card_ids.indexOf(card.id);

    if (card_idx > -1) { list.toJSON().card_ids.splice(card_idx, 1); }
  },
  save: function() {
    $.ajax({
      url: "/lists/save",
      type: "post",
      data: { data: JSON.stringify(this.toJSON()) }
    });
  }
});