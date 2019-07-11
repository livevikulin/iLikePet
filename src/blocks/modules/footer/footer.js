import 'jquery';

$(document).ready(function() {

	$('.footer-block__title').click(function() {
		$(this).children().toggleClass('arrow-toggle');
		$(this).parent().find('.footer-nav').slideToggle();
	});

})