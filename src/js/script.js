import "jquery";
import "@fancyapps/fancybox/";
import "jquery-ui-bundle";
import "slick-slider";



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
	
	//Инициализация jquery ui + ползунок в фильтре
	$("#slider-range").slider({
        range: true,
        min: 0,
        max: 10,
        values: [ 0, 10 ],
        stop: function(event, ui){
            $('input#minCost').val($('#slider-range').slider('values', 0));
            $('input#maxCost').val($('#slider-range').slider('values', 1));
        },
        slide: function(event, ui){
            $('input#minCost').val($('#slider-range').slider('values', 0));
            $('input#maxCost').val($('#slider-range').slider('values', 1));
        }
    });
    $('input#minCost').change(function(){
        var value1 = $('input#minCost').val();
        var value2 = $('input#maxCost').val();
        
        if (parseInt(value1) > parseInt(value2)){
            value1 = value2;
            $('input#minCost').val(value1);
        }
        $('#slider-range').slider('values', 0, value1);
    });
    $('input#maxCost').change(function(){
        var value1 = $('input#minCost').val();
        var value2 = $('input#maxCost').val();

        if (value2 > 10){value2 = 10; $('input#maxCost').val(10)}
        if (parseInt(value1) > parseInt(value2)){
            value2 = value1;
            $('input#maxCost').val(value2);
        }
        $('#slider-range').slider('values', 1, value2);
    })
	
	//Календарь на странице с событиями
	$('#datepicker').datepicker({
		firstDay: 1,
		numberOfMonths: 2,
	});
	$('.events-week__this').click(function(e) {
		e.preventDefault();
		$(this).addClass('events-pick__week');
		$('.events-week__other').removeClass('events-pick__week');
		$('.events-calendar').slideUp();
	});
	$('.events-week__other').click(function(e) {
		e.preventDefault();
		$(this).addClass('events-pick__week');
		$('.events-week__this').removeClass('events-pick__week');
		$('.events-calendar').slideDown();
	});
		
	//Фильтр
	$('.filter-box__item').click(function() {
		$(this).next().slideToggle();
		$(this).children('.fas').toggleClass('rotate180');
	});
	
	//Инициализация slick-slider
	$('.dog-page-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: true,
		asNavFor: '.dog-page-slider__nav'
	});
	$('.dog-page-slider__nav').slick({
		slidesToShow: 6,
		asNavFor: '.dog-page-slider',
		focusOnSelect: true
	});

});