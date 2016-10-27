var request = require("request");
var todolist = require("../app.js");
var base_url = "http://localhost:3000";

describe("Todo List Server", function() {
  describe("GET /",function() {
    it("should return status code 200",function() {
      request.get(base_url, function(err, res, body) {
        expect(res.statusCode).toBe(200);
        todolist.closeServer();
        done();
      });
    });
  });
});
