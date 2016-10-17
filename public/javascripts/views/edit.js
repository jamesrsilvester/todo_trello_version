var EditCardView = Backbone.View.extend({
  template: App.templates.edit,
  attributes: {
    "class": "overlay"
  },
  events: {
    "click .edit-comment input[type='submit']": "editComment",
    "click .edit-description input[type='submit']": "editDes",
    "click.outside_edit": "outsideEditView",
    "click #close_edit_view": "closeEditView",
    "click a.edit-close": "closePopOver",
    "click a.pop-link": "openPopOver",
    "click a.edit_description_link": "popEditDes",
    "click .description": "popEditDes",
    "click .first-edit p": "popEditDes",
    "change .edit-header textarea": "editTitle",
    "input .comment-new textarea": "commentDetect",
    "input .edit-comment textarea": "commentDetect",
    "focus .edit-comment textarea": "commentDetect",
    "click .comment-new input[type='submit']": "newComment",
    "click .comment_edit": "popEditComment",
    "click a.close_edit_comment": "closeEditComment",
    "click .comment_delete": "deleteComment",
    "change select": "renderSelect",
    "input #due_time": "inputTime",
    "blur #due_time": "formatTime",
    "change input[name='due_date']": "formatDueDate",
    "click button.remove": "removeDueDate",
    "submit .remove": "deleteCard",
    "submit .pop-over": "submitPopOver"
  },
  deleteCard: function(e) {
    e.preventDefault();
    var $f = $(e.target);
    App.lists.removeCard(this.model);

    $.ajax({
      url: $f.attr("action"),
      type: $f.attr("method"),
      success: function(json) {
        App.lists.set(json);
        window.history.back();
      }
    });
  },
  removeDueDate: function(e) {
    var inputs = $.makeArray($(e.target).closest("form").find("input[type='text']"));

    inputs.forEach(function(input) {
      input.value = "";
    });

    this.save();
  },
  formatDueDate: function(e) {
    var $input = $(e.target),
        today = new Date(),
        month_map = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        date = $input.val().trim().match(/\d+/g),
        month, day, year,
        tmr_day, tmr_month;

    if (date) {
      month = date.length > 0 ? +date[0] : "";
      day = date.length > 1 ? +date[1] : "";
      year = date.length > 2 ? +date[2] : today.getFullYear();

      if (month && month < 13) {
        if (day && day < 32) {
          month = month < 10 ? ("0" + month) : month;
          date = new Date(year, month - 1, day).toDateString().split(" ");

          if (date[1] === month_map[month - 1] && +date[2] === day) {
            day = day < 10 ? ("0" + day) : day;
            date = month + "/" + day + "/" + year;
          } else {
            date = false;
          }

        } else {
          date = month + "/01/" + year;
        }
      } else {
        date = false;
      }
    }

    if (!date) {
      date = this.model.due_date;
      if (!date) {
        tmr_day = (today.getDate() > 9) ? today.getDate() : "0" + today.getDate();
        tmr_month = (today.getMonth() + 1 > 9) ? today.getMonth() + 1 : "0" + (today.getMonth() + 1);
        date = tmr_month + "/" + tmr_day + "/" + tomorrow.getFullYear();
      }
    }

    $input.val(date);
  },
  formatTime: function(e) {
    var $input = $(e.target),
        time = $input.val().trim().toUpperCase();

    time = this.validateTime(time);
    if (!time) { time = "12:00 PM"; }
    $input.val(time);
  },
  inputTime: function(e) {
    var $input = $(e.target),
        time = $input.val().trim().toUpperCase();

    time = this.validateTime(time);

    if (!time) {
      $input.addClass("input-error");
    } else {
      $input.removeClass("input-error");
    }
  },
  validateTime: function(time) {
    var hr_min = time.match(/:|\d+/g),
        am_pm = time.match(/(AM$)|(PM$)|[A-Z]+$|[APM]/ig),
        am_pm_result, hr_min_result, apm_string, hr, min;

    if (am_pm) {
      am_pm_result = am_pm.find(function(apm) {
        return apm.substr(0, 2) === "AM" || apm.substr(0, 2) === "PM";
      });

      if (am_pm_result) {
        am_pm_result = am_pm_result.substr(0, 2);
      } else if (!am_pm_result) {
        apm_string = am_pm.pop().match(/[APM]/g);
        if (apm_string) {
          apm_string = apm_string.join("").match(/(A|P)+(M)/g);
          if (apm_string) {
            am_pm_result = apm_string[0].split("").find(function(apm) { return apm === "A" || apm === "P"; });
            if (am_pm_result) { am_pm_result += "M"; }
          } else {
            apm_string = am_pm.join("").match(/(A|P)+(M)/g);
            if (apm_string) {
              am_pm_result = apm_string[0].split("").find(function(apm) { return apm === "A" || apm === "P"; });
              if (am_pm_result) { am_pm_result += "M"; }
            }
          }
        }
      }
    }
    if (!am_pm_result) { am_pm_result = "PM"; }

    if (hr_min) {

      if (hr_min.length === 1) {
        if (+hr_min[0].slice(0, 2) < 24) {
          min = hr_min[0].slice(2, 4) || 0;
          hr = hr_min[0].slice(0, 2);
        }
      } else {
        hr = hr_min.join(" ").match(/\d*\s?\d*/)[0].split(" ")[0].slice(0, 2);
        min = hr_min.join("").match(/:\d+/);
        if (min) {
          min = +min[0].slice(1, 3);
          if (min > 60) { min = undefined;console.log(min); }
        } else {
          hr_min = hr_min.join(" ").match(/\d*\s?\d*/)[0].split(" ");
          min = hr_min[0].slice(2);
          if (!min && hr_min.length > 1) { min = hr_min[1].substr(0, 2); }
        }
      }

      if (!!hr && +hr < 24 && min >= 0) {
        if (hr > 12) {
          hr = hr - 12;
        } else if (hr < 12) { am_pm_result = "AM"; }
        if (min < 9) {
          hr_min_result = hr + ":0" + min;
        } else if (min > 9 && min < 60) {
          hr_min_result = hr + ":" + min;
        } else {
          hr_min_result = hr + ":" + Math.floor(min/10);
        }
        time = hr_min_result + " " + am_pm_result;
      } else {
        time = false;
      }
    }

    return time;
  },
  submitPopOver: function(e) {
    e.preventDefault();
    var $f = $(e.target),
        self = this;

    if ($f.attr("action").match("/card/delete")) { return; }

    $.ajax({
      url: $f.attr("action"),
      type: $f.attr("method"),
      data: $f.serialize(),
      success: function(json) {
        App.lists.set(json.lists);
        App.indexView();
        App.renderEditCard(json.card.id);
      }
    });
  },
  save: function() {
    var self = this;
    $.ajax({
      url: "/card/save",
      type: "post",
      data: { data: JSON.stringify(this.model) },
      success: function(json) {
        self.render();
      }
    });
  },
  editTitle: function(e) {
    e.preventDefault();
    var title = $(e.target).val();

    if (!title) { return; }
    this.model.title = title;
    this.save();
  },
  editDes: function(e) {
    e.preventDefault();
    var description = $(e.target).parent().prev("textarea").val();

    this.model.description = description;
    this.save();
  },
  editComment: function(e) {
    e.preventDefault();
    var $textarea = $(e.target).parent().prev("textarea"),
        comment = $textarea.val(),
        id = +$textarea.attr("data-id"),
        edit_comment = {"comment": comment, "id": id};

    if (!comment) { return; }
    this.model.comments.splice(id - 1, 1, edit_comment);
    this.save();
  },
  newComment: function(e) {
    e.preventDefault();
    var comment = $(e.target).parent().prev("textarea").val(),
        current_last_id = this.model.comments.length;

    if (!comment) { return; }
    this.model.comments.push({"comment": comment, "id": current_last_id + 1});
    this.save();
  },
  popEditComment: function(e) {
    e.preventDefault();
    var $comment = $(e.target).parents(".comment").hide(),
        $edit_panel = $comment.next(".edit-comment").show();

    $edit_panel.find("textarea").focus();
  },
  closeEditComment: function(e) {
    e.preventDefault();

    var $edit_panel = $(e.target).closest(".edit-comment").hide();
    $edit_panel.prev(".comment").show();
  },
  deleteComment: function(e) {
    e.preventDefault();
    var id = +$(e.target).attr("data-id");
    this.model.comments.splice(id - 1, 1);
    this.save();
  },
  commentDetect: function(e) {
    var $textarea = $(e.target),
        $control_panel = $(e.target).next("div[class*='control']"),
        $empty_alert = $control_panel.find(".empty_alert");

    if ($textarea.val()) {
      $empty_alert.hide();
      $control_panel.removeClass("control-inactive").addClass("control");
    } else if (!$textarea.val()) {
      $empty_alert.show();
      $control_panel.removeClass("control").addClass("control-inactive");
    }
  },
  popEditDes: function(e) {
    e.preventDefault();
    var $edit = $(e.target).closest(".edit").hide(),
        $edit_des = this.$el.find(".edit-description").show(),
        $textarea = $edit_des.find("textarea");

    this.closeEditDes($edit, $textarea);
  },
  closeEditDes: function($edit, $textarea) {
    var self = this,
        show_hide = function() {
          $edit.show();
          $textarea.parent().hide();
        };

    self.$el.on("click.outside_edit_des", function(e) {
      self.clickOutside(e, $textarea, show_hide);
      self.$el.off("click.outside_edit_des");
    });
  },
  openPopOver: function(e) {
    e.preventDefault();
    var $pop_link = $(e.target),
        $pop = $pop_link.next(".pop-over");

    this.$el.find(".pop-over").hide();
    this.$el.off("click.outside_edit");

    if ($pop.length !== 0) {
      $pop.show();
    } else {
      $pop = $pop_link.parent().next(".pop-over").show();
    }

    this.outsidePopOver($pop);
  },
  outsidePopOver: function($pop) {
    var self = this;

    self.$el.on("click.outside_pop", function(e) {
      self.clickOutside(e, $pop, function($el) { $el.hide(); });
    });
  },
  closePopOver: function(e) {
    e.preventDefault();
    $(e.target).closest(".pop-over").hide();
  },
  outsideEditView: function(e) {
    e.preventDefault();
    var $edit_card = this.$el.find(".edit-card");

    this.clickOutside(e, $edit_card, function() { window.history.back(); });
  },
  clickOutside: function(e, $el, callback) {
    var left_edge = $el.offset().left,
        right_edge = left_edge + $el.width(),
        top_edge = $el.offset().top,
        bottom_edge = top_edge + $el.height();

    if (e.clientX < left_edge || e.clientX > right_edge ||
        e.clientY < top_edge || e.clientY > bottom_edge) {
      if (e.clientX === 0 && e.clientY === 0) { return; }
      callback($el);
      this.$el.off("click.outside_pop");
      this.$el.on("click.outside_edit", this.outsideEditView.bind(this));
    }
  },
  renderSelect: function(e) {
    var $selected = $(e.target).find(":selected"),
        option = $selected.html(),
        options = "",
        list_id = +$selected.attr("list-id"),
        self = this,
        action = $selected.parents("form").find(".control input").val().toLowerCase(),
        cards, cards_last_position, new_card_position, $position;

    $selected.parent().prev("span").html(option);

    if (list_id) {
      cards = App.lists.get(list_id).toJSON().cards,
      cards_last_position = cards.length + 1;

      if (cards.indexOf(this.model) === -1) {
        for (var i = 1; i <= cards.length; i++) {
          options = options + "<option value='" + i + "'>" + i + "</option>";
        }
        new_card_position = cards_last_position;
        options = options + "<option value='" + new_card_position + "' selected>" + new_card_position + "</option>";
      } else {
        cards.forEach(function(card, idx) {
          var position = idx + 1;
          if (card.id === self.model.id) {
            new_card_position = position;
            options = options + "<option value='" + position + "' selected>" + position + " (current)" + "</option>";
          } else {
            options = options + "<option value='" + position + "'>" + position + "</option>";
          }
        });

        if (action === "copy") {
          options = options + "<option value='" + cards_last_position + "'>" + cards_last_position + "</option>";
        }
      }

      $position = $selected.closest(".button-select-threequarters").next(".button-select-quarter").find("select");
      $position.html(options);
      $position.prev("span").html(new_card_position);
    }
  },
  closeEditView: function(e) {
    e.preventDefault();
    window.history.back();
  },
  render: function() {
    this.$el.html(this.template(this.model));
    App.$el.append(this.$el);
  },
  initialize: function() {
    this.render();
  }
});