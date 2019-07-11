import 'jquery'

$(document).ready(function() {
	
	$(window).scroll(function() {
		if ($(this).scrollTop() > 250) {
			$('.nav-fixed').slideDown();
		} else if ($(this).scrollTop() < 250) {
			$('.nav-fixed').hide()
		}
	});
	
	//Строка поиска
	$('.navbar-item__search').click(function() {
		$(this).parent().find('.navbar-search').addClass('search-open');
		$('.navbar-item__op').addClass('navbar-button');
		$(this).parent().find('.navbar-search__close').show(850);
	});
	$('.navbar-search__close').click(function() {
		$(this).hide();
		$(this).parent().find('.navbar-search').removeClass('search-open');
		$('.navbar-item__op').removeClass('navbar-button');
	});
	
	$('.navbar-fixed__search').click(function(e) {
		e.preventDefault();
		$(this).parent().find('.navbar-search').addClass('search-open');
		$('.navbar-fixed__op').addClass('navbar-button');
		$(this).parent().find('.navbar-search__close').show(850);
	});
	$('.navbar-search__close').click(function() {
		$(this).hide();
		$(this).parent().find('.navbar-search').removeClass('search-open');
		$('.navbar-fixed__op').removeClass('navbar-button');
	});
	
});