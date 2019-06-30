import "jquery";

import "@fancyapps/fancybox/";

import "@fortawesome/fontawesome-free";
// require("fancybox");

// var $ = require('jquery');
// require('fancybox')($)

// Initialise imported function as jQuery function
// $.fn.fancybox = fancybox;


$(document).ready(function() {
	
	//Инициализация fancybox
	$('[data-fancybox]').fancybox({
		helpers : {
            media : {}
        },
	});
	
	//Фильтр
	$('.filter-box__item').click(function() {
	
		$(this).next().slideToggle();
	
	
	});
	
	//Сортировка по дате и рейтингу
	// $('.sorting-data').click(function() {
	// 	if ($(this).click()) {
	// 		$(this).addClass('sorting-select');
	// 		$('.sorting-rating').removeClass('sorting-select');
	// 	} else if ($('.sorting-rating').click()) {
	// 		$('.sorting-data').removeClass('sorting-select');
	// 		$(this).addClass('sorting-select');
	// 	}
	// })

});