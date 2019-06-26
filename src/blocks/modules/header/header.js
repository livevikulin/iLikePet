import 'jquery'

$(document).ready(function() {
	
	$(window).scroll(function() {
		if ($(this).scrollTop() > 250) {
			$('.nav-fixed').slideDown();
		} else if ($(this).scrollTop() < 250) {
			$('.nav-fixed').hide()
		}
	});
	
});