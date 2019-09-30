import 'jquery'

$(document).ready(function() {
	
	$(window).scroll(function() {
		if ($(this).scrollTop() > 250) {
			$('.nav-fixed').addClass('nav-active');
			
		} else {
			$('.nav-fixed').removeClass('nav-active');
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
		//Поправил классы
		$('.navbar-item__op').addClass('navbar-button');
		$(this).parent().find('.navbar-search__close').show(850);
	});
	$('.navbar-search__close').click(function() {
		$(this).hide();
		$(this).parent().find('.navbar-search').removeClass('search-open');
		//Поправил классы
		$('.navbar-item__op').removeClass('navbar-button');
	});
	
	//Меню на мобиле
	$('.header-mobile__burger').click(function() {
		$('.header-mobile__menu').slideDown();
		$('body').css('overflow', 'hidden');
		$(document).bind('touchmove', false);
	});
	$('.header-mobile__close i').click(function() {
		$('.header-mobile__menu').slideUp();
		$('body').css('overflow', 'auto');
	});
	
	//Поиск на мобиле
	$('.header-mobile__search').click(function() {
		$('.header-mobile__search-block').slideDown();
		$(document).bind('touchmove', false);
	});
	$('.header-mobile__search-close i').click(function() {
		$('.header-mobile__search-block').slideUp();
		$('html').css('overflow', 'auto');
	});
});