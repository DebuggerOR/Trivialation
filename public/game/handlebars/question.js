(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['question'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                         <div class=\" col-sm-12 col-md-6\">\r\n                        <div class=\"answer\">\r\n                            "
    + container.escapeExpression(((helper = (helper = helpers.answer || (depth0 != null ? depth0.answer : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"answer","hash":{},"data":data}) : helper)))
    + "\r\n                        </div>\r\n                    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"row justify-content-md-center game-container \">\r\n    <div class=\"col-xs-12\">\r\n        <div class=\"row justify-content-md-center\">\r\n            <div class=\"col-sm-10 col-md-8  question-container rounded\">\r\n                <div class=\"row the-question-container\">\r\n                    <div class=\"col-12 \">\r\n                        <div class=\"question-number\">\r\n                            <h4>"
    + alias4(((helper = (helper = helpers.question_number || (depth0 != null ? depth0.question_number : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question_number","hash":{},"data":data}) : helper)))
    + " / "
    + alias4(((helper = (helper = helpers.total || (depth0 != null ? depth0.total : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"total","hash":{},"data":data}) : helper)))
    + "</h4>\r\n                        </div>\r\n                        <h2 class=\"question\"> "
    + alias4(((helper = (helper = helpers.question || (depth0 != null ? depth0.question : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question","hash":{},"data":data}) : helper)))
    + "</h2>\r\n                        <p class=\"timer\">10</p>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row answers-container equal\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.answers : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                   \r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
})();