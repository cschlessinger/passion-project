'use strict'
$(document).ready(function() {
	$('a[href*=#]').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
	    && location.hostname == this.hostname) {
	      var $target = $(this.hash);
	      $target = $target.length && $target
	      || $('[name=' + this.hash.slice(1) +']');
	      if ($target.length) {
	        var targetOffset = $target.offset().top;
	        $('html,body')
	        .animate({scrollTop: targetOffset}, 1000);
	       return false;
	      }
	    }
	  });
	function goToByScroll(stories){
	    $('html,body').animate({scrollTop: $("#"+id).offset().top},'slow');
	}
	// newsCall();
	// charityCauses();
})

// API request to Charity AIP
var newsCall = function() {
		var keywords = [];
		var headline = "";
		var url = "";
		var lead = "";
	  $.ajax({
	  	// url: 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=bombing&api-key=ec7fb763d9053389406d5d284fcab0b0:14:59506039',
	  	url: 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=humanitarian+aid&fq=type_of_material:("News") AND section_name:("World")&sort=newest&api-key=ec7fb763d9053389406d5d284fcab0b0:14:59506039',
	  	method: 'get'
	  })
	  .done(function(data) {
	  	data.response.docs.forEach(function(article) {
	  		headline = article.headline.main;
	  		lead = article.lead_paragraph;
	  		url = article.web_url;
	  		article.keywords.forEach(function(object) {
	  			keywords.push(object.value);
	  		});
	  		if ($('.row').last().children().length !== 3) {
	  			$('.row').last().append("<div class='col-md-4'><div class='story'><div class='headline'>" + "<a href=" + url + " target='_blank'>" + headline + "</a></div>" + "<div class='lead'>" + lead + "</div>" + "<div class='keywords'>" + keywords.sort().join(", ") + "</div>" + "<div class='get-involved'></div></div>")
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

var charityCauses = function() {
	var causes = [];
	var charities = [];
	$.ajax({
		// url: 'http://api.charitynavigator.org/api/v1/causes/?app_key=0eff25692da9109677649750f51ff65c&app_id=cc464b0f&format=json&limit=100',
		url: 'http://api.charitynavigator.org/api/v1/categories/?app_key=0eff25692da9109677649750f51ff65c&app_id=cc464b0f&format=json&rated=2',
		method: 'get'
	})
	.done(function(data) {
		// var cats = $(data).find('category');
		// for (var i = 0; i < cats.length; i++) {
		// 	causes.push(cats[i].innerHTML)
		// }
		// console.log(data);
		var orgs = $(data).find('Charity_Name');
		for (var i = 0; i < orgs.length; i++) {
			charities.push(orgs[i].innerHTML)
		}
		console.log(data);
	});
	return charities;
}