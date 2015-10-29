'use strict'
$(document).ready(function() {
	// $('#stories').on(click, function(e) {
	// 	e.preventDefault();
 //    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
 //    && location.hostname == this.hostname) {
 //      var $target = $(this.hash);
 //      $target = $target.length && $target
 //      || $('[name=' + this.hash.slice(1) +']');
 //      if ($target.length) {
 //        var targetOffset = $target.offset().top;
 //        $('html,body')
 //        .animate({scrollTop: targetOffset}, 1000);
 //       return false;
 //      }
 //    }
 //  });
	// function goToByScroll(stories){
	//   $('html,body').animate({scrollTop: $(#stories).offset().top},'slow');
	// };
	$('button').click(function(event) { // Update data
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
	$('form').submit(function(event) { // Search by term
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
