var path = require("path"),
    _ = require("underscore"),
    Lists = require(path.resolve(path.dirname(__dirname), "routes/list_module"));

module.exports = function(router) {
  router.get('/card/edit/:card_id', function(req, res, next) {
    res.render("edit", {
      lists: Lists.get(),
      card: Lists.getCard(Lists.get(), +req.params.card_id)
    });
  });

  router.post('/card/new', function(req, res, next) {
    var lists = Lists.newCard(req.body);

    res.json(lists);
  });

  router.post('/card/save', function(req, res, next) {
    var card = Lists.setCard(JSON.parse(req.body.data));

    res.json(card);
  });

  router.post('/card/copy/:card_id', function(req, res, next) {
    var data = Lists.copyCard(req.body, +req.params.card_id);

    res.json(data);
  });

  router.post('/card/move/:card_id', function(req, res, next) {
    var data = Lists.moveCard(req.body, +req.params.card_id);

    res.json(data);
  });

  router.post('/card/duedate/:card_id', function(req, res, next) {
    var data = Lists.setCardData(req.body, +req.params.card_id);

    res.json(data);
  });

  router.post('/card/delete/:card_id', function(req, res, next) {
    var lists = Lists.deleteCard(+req.params.card_id);

    res.json(lists);
  });

  router.post('/list/edit', function(req, res, next) {
    var list = Lists.setListTitle(+req.body.id, req.body.title);

    res.json(list);
  });

  router.post('/list/new', function(req, res, next) {
    var list = Lists.newList(req.body);

    res.json(list);
  });

  router.post('/lists', function(req, res, next) {
    Lists.set(Lists.getLastListID(), Lists.getLastCardID(), JSON.parse(req.body.data));

    res.json("lists saved");
  });
};
