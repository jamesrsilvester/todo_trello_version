describe("EditCardView", function() {

  beforeEach(function() {
    this.card = new Card({
      id: 1,
      title: "card_title",
      list_title: "list_title",
      list_id: 1,
      description: ""
    });

    this.view = new EditCardView({
      model: this.card
    });
  });

  describe("function validateTime",function() {
    it("should return last first AM or PM",function() {
      expect(this.view.validateTime("am 1ampm")).toEqual("1:00 AM");
    });

    it("should return last first A or P M",function() {
      expect(this.view.validateTime("1apm")).toEqual("1:00 AM");
    });

    it("should return combined single A P M",function() {
      expect(this.view.validateTime("3A 4P 2M")).toEqual("3:04 AM");
    });

    it("should return first number as hour",function() {
      expect(this.view.validateTime("1a3m")).toEqual("1:03 AM");
    });

    it("should return false if the first number is greater than 23",function() {
      expect(this.view.validateTime("24")).toEqual(false);
    });

    it("should return second number as minute",function() {
      expect(this.view.validateTime("3a 4pm")).toEqual("3:04 PM");
    });

    it("should return first number after ':' as minute",function() {
      expect(this.view.validateTime("3a 6 :4pm")).toEqual("3:04 PM");
    });

  });

});
