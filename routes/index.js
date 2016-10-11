var path = require("path"),
    Lists = require(path.resolve(path.dirname(__dirname), "routes/list_module"));

module.exports = function(router) {
  router.get('/', function(req, res, next) {
    res.render("index", {
      title: "Todo List",
      lists: Lists.get()
    });
  });
};
