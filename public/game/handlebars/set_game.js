(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['set_game'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <option value=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"col-10 col-md-7 set-game-container justify-content-center\">\r\n                <label for=\"trivia_category\">Select Category: </label>\r\n                <select id=\"trivia_category\" class=\"form-control\">\r\n                        <option value=\"1\">Any Catagory</option>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.trivia_categories : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </select>\r\n                <br>\r\n                <label for=\"trivia_difficulty\">Select Difficulty: </label>\r\n                <select id=\"trivia_difficulty\" class=\"form-control\">\r\n                    <option value=\"any\">Any Difficulty</option>\r\n                    <option value=\"easy\">Easy</option>\r\n                    <option value=\"medium\">Medium</option>\r\n                    <option value=\"hard\">Hard</option>\r\n                </select>\r\n                <br>\r\n                <div class=\"row justify-content-center\">\r\n                    <button class=\"btn start-game-btn\">\r\n                        START GAME\r\n                    </button>\r\n                </div>\r\n            </div>";
},"useData":true});
})();