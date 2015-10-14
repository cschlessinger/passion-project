'use strict'
$(document).ready(function() {
	newsCall();
	// charityCauses('iraq');
})

// API request to Charity AIP
var newsCall = function() {
		var keywords = [];
		var headline = "";
		var lead = "";
	  $.ajax({
	  	// url: 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=bombing&api-key=ec7fb763d9053389406d5d284fcab0b0:14:59506039',
	  	url: 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:("World")&begin_date=20151010&end_date=20151014&sort=oldest&api-key=ec7fb763d9053389406d5d284fcab0b0:14:59506039',
	  	method: 'get'
	  })
	  .done(function(data) {
	  	data.response.docs.forEach(function(article) {
	  		headline = article.headline.main;
	  		lead = article.lead_paragraph;
	  		article.keywords.forEach(function(object) {
	  			keywords.push(object.value);
	  		});
	  		if ($('.row').last().children().length !== 3) {
	  			$('.row').last().append("<div class='col-md-4'><div class='story'><div class='headline'>" + headline + "</div>" + "<div class='lead'>" + lead + "</div>" + "<div class='keywords'>" + keywords + "</div>" + "<div class='get-involved'></div></div>")
					// $('.row').last.append("<div class='headline'>" + headline + "</div>");
					// $('.story').append("<div class='lead'>" + lead + "</div>");
					// $('.story').append("<div class='keywords'>" + keywords + "</div>");	
  			} else {
	  			$('.container').append("<div class='row'><div class='col-md-4'><div class='story'><div class='headline'>" + headline + "</div>" + "<div class='lead'>" + lead + "</div>" + "<div class='keywords'>" + keywords + "</div>" + "<div class='get-involved'></div></div></div></div>")

  			}
	  	});
	  	console.log(data.response);
	  })
};

var charityCauses = function(news_keyword) {
	var causes = []
	$.ajax({
		url: 'http://api.charitynavigator.org/api/v1/causes/?app_key=0eff25692da9109677649750f51ff65c&app_id=cc464b0f&format=xml&term=' + news_keyword,
		method: 'get'
	})
	.done(function(data) {
		// var cats = $(data).find('category');
		// for (var i = 0; i < cats.length; i++) {
		// 	causes.push(cats[i].innerHTML)
		// }
		// console.log(causes);
		console.log(data)
	})
}