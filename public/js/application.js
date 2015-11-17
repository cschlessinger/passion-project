'use strict'
$(document).ready(function() {
	// Update page data (refresh feed) using default query
	$('button').click(function(event) {
		event.preventDefault();
		$.ajax({
			method: 'get',
			url: '/update',
			dataType: 'json'
		})
		.done(function(data) {
			update_data(data);
  	});
	});
	// Search by term in search bar
	$('form').submit(function(event) {
		event.preventDefault();
		var search = $('input[type="text"]').val();
		$.ajax({
			method: 'post',
			url: '/search',
			dataType: 'json',
			data: {query: search}
		})
		.done(function(data) {
			update_data(data);
			$('input[type="text"]').val("");
		});
	});
	var update_data = function(data) {
		var articleTemplate = $('#article-template').html(),
		    articleHtml,
		    lastRow;
		for (var i = 0; i < data.length; i++) {
			articleHtml = Mustache.render(articleTemplate, data[i]);
			lastRow = $('.row').last()
			if(lastRow.children().length === 3 || $('#stories').children().length === 0) {
				$('#stories').append("<div class='row'></div>")
				lastRow = $('.row').last()
			}
			lastRow.append(articleHtml);
			// @TODO: figure out why first 7 or 8 of refresh feed doesn't pull in keywords
		};
	}
})
