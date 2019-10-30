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
	$('.js-search-toggle-link').click(function(e) {
		e.preventDefault();
		const $el = $(e.target);
		const $navbar = $el.closest('.js-navbar');

		$navbar.find('.js-navbar-search').fadeToggle().toggleClass('navbar-search_opened');
		$navbar.find('.js-menu').toggleClass('navbar__menu-wrap_hidden');
		$navbar.find('.js-logo').toggleClass('navbar-fixed__logo_hidden');
		$navbar.find('.js-account').toggleClass('navbar-fixed__account_hidden');
	});

	//Меню на мобиле
	$('.header-mobile__burger').click(function() {
		$('.header-mobile__menu').slideDown();
		$('body').css('overflow', 'hidden');
		
		$(".js-city").css("z-index", "999").fadeIn(300);
	});
	$('.header-mobile__close i').click(function() {
		$('.header-mobile__menu').slideUp();
		$('body').css('overflow', 'auto');
		$(".js-city").css("z-index", "10");
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