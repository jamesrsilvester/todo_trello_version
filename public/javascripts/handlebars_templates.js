this["JST"] = this["JST"] || {};

this["JST"]["edit"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "";
},"3":function(container,depth0,helpers,partials,data) {
    return "<div class=\"edit edit-due\"><h3>Due Date</h3><a class=\"pop-link\">"
    + container.escapeExpression((helpers.formatDate || (depth0 && depth0.formatDate) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.due_date : depth0),(depth0 != null ? depth0.due_time : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</a></div>";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<input type=\"text\" name=\"due_date\" value=\""
    + container.escapeExpression(((helper = (helper = helpers.due_date || (depth0 != null ? depth0.due_date : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"due_date","hash":{},"data":data}) : helper)))
    + "\"/>";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<input type=\"text\" name=\"due_date\" value=\""
    + container.escapeExpression(((helper = (helper = helpers.tomorrow || (depth0 != null ? depth0.tomorrow : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"tomorrow","hash":{},"data":data}) : helper)))
    + "\"/>";
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<input type=\"text\" name=\"due_time\" id=\"due_time\" value=\""
    + container.escapeExpression(((helper = (helper = helpers.due_time || (depth0 != null ? depth0.due_time : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"due_time","hash":{},"data":data}) : helper)))
    + "\"/>";
},"11":function(container,depth0,helpers,partials,data) {
    return "<input type=\"text\" name=\"due_time\" id=\"due_time\" value=\"12:00 PM\"/>";
},"13":function(container,depth0,helpers,partials,data) {
    return "<div class=\"first-edit\"><p><span class=\"icon_pencil-edit\"></span><a>Edit the description...</a></p></div>";
},"15":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"edit\"><h3>Description<a class=\"edit_description_link\">Edit</a></h3><div class=\"description\"><p>"
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "</p></div></div>";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.comments : depth0),{"name":"each","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"18":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"comment\"><img src=\"http://placehold.it/30/0079bf\" /><div class=\"comment-content\"><p>"
    + alias4(((helper = (helper = helpers.comment || (depth0 != null ? depth0.comment : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comment","hash":{},"data":data}) : helper)))
    + "</p></div><div class=\"comment-control\"><span><a class=\"comment_edit\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">Edit</a>-<a class=\"comment_delete\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">Delete</a></span></div></div><div class=\"edit-comment\"><img src=\"http://placehold.it/30/0079bf\" /><textarea data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.comment || (depth0 != null ? depth0.comment : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comment","hash":{},"data":data}) : helper)))
    + "</textarea><div class=\"control-inactive\"><p class=\"empty_alert\">You haven't typed anything!</p><input type=\"submit\" value=\"Save\" /><a class=\"icon_close close_edit_comment\"></a></div></div>";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<label>Keep...</label><div class=\"keep_comments\"><input type=\"checkbox\" id=\"keep_comments\" name=\"keep_comments\" value=\"true\" checked/><label for=\"keep_comments\">Comments<span> ("
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.comments : depth0)) != null ? stack1.length : stack1), depth0))
    + ")</span></label></div>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"edit-card\"><a class=\"icon_close edit-close\" id=\"close_edit_view\"></a><div class=\"edit-header\"><span class=\"icon_document_alt\"></span><textarea>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</textarea><p>in list <a class=\"pop-link\">"
    + alias4(((helper = (helper = helpers.list_title || (depth0 != null ? depth0.list_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"list_title","hash":{},"data":data}) : helper)))
    + "</a></p><div class=\"pop-over\" style=\"right: 305px;\"><div class=\"pop-over-header\"><h3>Move</h3><a class=\"icon_close edit-close\"></a></div><div class=\"pop-over-content\"><form action=\"/card/move/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" mothod=\"post\"><div class=\"button-select-threequarters\"><span class=\"title\">List</span><span class=\"content\">"
    + alias4(((helper = (helper = helpers.list_title || (depth0 != null ? depth0.list_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"list_title","hash":{},"data":data}) : helper)))
    + "</span><select name=\"list_id\">"
    + ((stack1 = (helpers.each_list_title || (depth0 && depth0.each_list_title) || alias2).call(alias1,(depth0 != null ? depth0.list_title : depth0),{"name":"each_list_title","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</select></div><div class=\"button-select-quarter\"><span class=\"title\">Position</span><span class=\"content\">"
    + alias4((helpers.card_position || (depth0 && depth0.card_position) || alias2).call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"card_position","hash":{},"data":data}))
    + "</span><select name=\"card_position\">"
    + ((stack1 = (helpers.each_card_position || (depth0 && depth0.each_card_position) || alias2).call(alias1,(depth0 != null ? depth0.list_id : depth0),(depth0 != null ? depth0.id : depth0),{"name":"each_card_position","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</select></div><div class=\"control\"><input type=\"submit\" value=\"Move\" /></div></form></div></div></div><div class=\"edit-main\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.due_date : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<div div class=\"pop-over\" style=\"right: 380px; top: 155px\"><div class=\"pop-over-header\"><h3>Due Date</h3><a class=\"icon_close edit-close\"></a></div><div class=\"pop-over-content\"><form action=\"/card/duedate/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" method=\"post\"><label>Date"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.due_date : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "</label><label>Time"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.due_time : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + "</label><div class=\"control\"><input type=\"submit\" value=\"Save\" /><button class=\"remove\">Remove</button></div></form></div></div>"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"unless","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data})) != null ? stack1 : "")
    + "<div class=\"edit-description\"><textarea>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</textarea><div class=\"control\"><input type=\"submit\" value=\"Save\" /><a class=\"icon_close close_edit_description\"></a></div></div><div class=\"module\"><div class=\"module-header\"><span class=\"icon_comment_alt\"></span><h3>Add Comment</h3></div><div class=\"comment-new\"><img src=\"http://placehold.it/30/0079bf\" /><textarea placeholder=\"Write a comment...\"></textarea><div class=\"control-inactive\"><input type=\"submit\" value=\"Send\" /></div></div></div><div class=\"module\"><div class=\"module-header\"><span class=\"icon_clipboard\"></span><h3>Activity</h3></div><div class=\"activity\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.comments : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div></div></div><div class=\"edit-sidebar\"><div class=\"module-header\"><h3>Add</h3><div><a class=\"pop-link\"><span class=\"icon_clock_alt\"></span>&nbsp;Due Date</a><div class=\"pop-over\"><div class=\"pop-over-header\"><h3>Due Date</h3><a class=\"icon_close edit-close\"></a></div><div class=\"pop-over-content\"><form action=\"/card/duedate/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" method=\"post\"><label>Date"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.due_date : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "</label><label>Time"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.due_time : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + "</label><div class=\"control\"><input type=\"submit\" value=\"Save\" /><button class=\"remove\">Remove</button></div></form></div></div></div></div><div class=\"module-header\"><h3>Action</h3><div><a class=\"pop-link\"><span class=\"arrow_right\"></span>&nbsp;Move</a><div class=\"pop-over\"><div class=\"pop-over-header\"><h3>Move</h3><a class=\"icon_close edit-close\"></a></div><div class=\"pop-over-content\"><form action=\"/card/move/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" method=\"post\"><div class=\"button-select-threequarters\"><span class=\"title\">List</span><span class=\"content\">"
    + alias4(((helper = (helper = helpers.list_title || (depth0 != null ? depth0.list_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"list_title","hash":{},"data":data}) : helper)))
    + "</span><select name=\"list_id\">"
    + ((stack1 = (helpers.each_list_title || (depth0 && depth0.each_list_title) || alias2).call(alias1,(depth0 != null ? depth0.list_title : depth0),{"name":"each_list_title","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</select></div><div class=\"button-select-quarter\"><span class=\"title\">Position</span><span class=\"content\">"
    + alias4((helpers.card_position || (depth0 && depth0.card_position) || alias2).call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"card_position","hash":{},"data":data}))
    + "</span><select name=\"card_position\">"
    + ((stack1 = (helpers.each_card_position || (depth0 && depth0.each_card_position) || alias2).call(alias1,(depth0 != null ? depth0.list_id : depth0),(depth0 != null ? depth0.id : depth0),{"name":"each_card_position","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</select></div><div class=\"control\"><input type=\"submit\" value=\"Move\" /></div></form></div></div></a><a class=\"pop-link\"><span class=\"icon_documents_alt\"></span>&nbsp;Copy</a><div class=\"pop-over\"><div class=\"pop-over-header\"><h3>Copy</h3><a class=\"icon_close edit-close\"></a></div><div class=\"pop-over-content\"><form action=\"/card/copy/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" method=\"post\"><label>Title<textarea name=\"title\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</textarea></label>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.comments : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<label>Copy to...</label><div class=\"button-select-threequarters\"><span class=\"title\">List</span><span class=\"content\">"
    + alias4(((helper = (helper = helpers.list_title || (depth0 != null ? depth0.list_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"list_title","hash":{},"data":data}) : helper)))
    + "</span><select name=\"list_id\">"
    + ((stack1 = (helpers.each_list_title || (depth0 && depth0.each_list_title) || alias2).call(alias1,(depth0 != null ? depth0.list_title : depth0),{"name":"each_list_title","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</select></div><div class=\"button-select-quarter\"><span class=\"title\">Position</span><span class=\"content\">"
    + alias4((helpers.card_position || (depth0 && depth0.card_position) || alias2).call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"card_position","hash":{},"data":data}))
    + "</span><select name=\"card_position\">"
    + ((stack1 = (helpers.each_card_position || (depth0 && depth0.each_card_position) || alias2).call(alias1,(depth0 != null ? depth0.list_id : depth0),(depth0 != null ? depth0.id : depth0),{"name":"each_card_position","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<option value=\""
    + alias4((helpers.card_addtional_position || (depth0 && depth0.card_addtional_position) || alias2).call(alias1,(depth0 != null ? depth0.list_id : depth0),{"name":"card_addtional_position","hash":{},"data":data}))
    + "\">"
    + alias4((helpers.card_addtional_position || (depth0 && depth0.card_addtional_position) || alias2).call(alias1,(depth0 != null ? depth0.list_id : depth0),{"name":"card_addtional_position","hash":{},"data":data}))
    + "</option></select></div><div class=\"control\"><input type=\"submit\" value=\"Copy\" /></div></form></div></div><a class=\"pop-link\"><span class=\"icon_trash_alt\"></span>&nbsp;Delete</a><div class=\"pop-over\"><div class=\"pop-over-header\"><h3>Delete Card?</h3><a class=\"icon_close edit-close\"></a></div><div class=\"pop-over-content\"><form class=\"remove\" action=\"/card/delete/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" method=\"delete\"><p class=\"delete_alert\">Deleting a card is forever. There is no undo.</p><div class=\"control\"><input type=\"submit\" class=\"remove\" value=\"Remove\" /></div></form></div></div></div></div></div></div>";
},"useData":true});

this["JST"]["index"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Welcome Board</h1><div class=\"lists\"><div class=\"list-composer\"><span>Add a list...</span><form action=\"/list/new\" method=\"post\"><input type=\"text\" name=\"title\" placeholder=\"Add a list...\"><div class=\"control\"><input type=\"submit\" value=\"Save\"><a class=\"icon_close\"></a></div></form></div></div>";
},"useData":true});

this["JST"]["list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"list-card\" id=\"card_"
    + alias2(alias1(depth0, depth0))
    + "\" dragable=\"true\"><div class=\"list-card-detail\"><a class=\"list-card-title\" href=\"/card/edit/"
    + alias2(alias1(depth0, depth0))
    + "\">"
    + alias2((helpers.card_title || (depth0 && depth0.card_title) || helpers.helperMissing).call(depth0 != null ? depth0 : {},depth0,{"name":"card_title","hash":{},"data":data}))
    + "</a></div></div>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"list-header\"><textarea>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</textarea></div><div class=\"list-cards\"><div class=\"list-card\" dragable=\"false\"></div>"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.card_ids : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<div class=\"card-new\"><div class=\"card-new-title\"><textarea></textarea></div><div class=\"control\"><input type=\"submit\" value=\"Add\"><a class=\"icon_close\"></a></div></div></div><a class=\"card-composer\">Add a card...</a>";
},"useData":true});