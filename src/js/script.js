import "jquery";
import "@fancyapps/fancybox/";
import "jquery-ui-bundle";
import "jquery-ui";
import "slick-slider";
import "jquery-mask-plugin";



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
	
	//Открытие / Закрытие модалки с благодарностью	
	$(window).on('sendshow', function () {
		$.fancybox.open({
		
			src  : '#thanks',
			type : 'inline'
		
		});
	});
	
	$('.comments-form__btn').click(function() {
		$(this).trigger('sendshow');
	});
	
	$('.thanks__btn').on('click', function () {
		$.fancybox.close();
	});
	
	//Натройка ползунка в фильтре
    var sliderRange = $("#slider-range");
    var dataMin = sliderRange.data("min");
    var dataMax = sliderRange.data("max");
    var dataValueMin = sliderRange.data("value-min");
    var dataValueMax = sliderRange.data("value-max");

    sliderRange.slider({
		range: true,
		min: dataMin,
		max: dataMax,
		values: [ dataValueMin, dataValueMax ],
		stop: function(event, ui){
			$('input#minCost').val(sliderRange.slider('values', 0));
			$('input#maxCost').val(sliderRange.slider('values', 1));
		},
		slide: function(event, ui){
			$('input#minCost').val(sliderRange.slider('values', 0));
			$('input#maxCost').val(sliderRange.slider('values', 1));
		}
	});
    $('input#minCost').change(function(){
        var value1 = $('input#minCost').val();
        var value2 = $('input#maxCost').val();
        
        if (parseInt(value1) > parseInt(value2)){
            value1 = value2;
            $('input#minCost').val(value1);
        }
        sliderRange.slider('values', 0, value1);
    });
    $('input#maxCost').change(function(){
        var value1 = $('input#minCost').val();
        var value2 = $('input#maxCost').val();

        if (value2 > 10){value2 = 10; $('input#maxCost').val(10)}
        if (parseInt(value1) > parseInt(value2)){
            value2 = value1;
            $('input#maxCost').val(value2);
        }
        sliderRange.slider('values', 1, value2);
    });

    $("input#minCost").keypress(function(e) {
		if (e.which != 8 && e.which != 0 && e.which != 46 && (e.which < 48 || e.which > 57)) {
			return false;
		}
	});
    $("input#maxCost").keypress(function(e) {
		if (e.which != 8 && e.which != 0 && e.which != 46 && (e.which < 48 || e.which > 57)) {
			return false;
		}
	});

    //Календарь на странице с событиями
    var dayNames = $( ".js-datepicker" ).datepicker( "option", "dayNames" );
    var dayNamesMin = $( ".js-datepicker" ).datepicker( "option", "dayNamesMin" );
    var monthNames = $( ".js-datepicker" ).datepicker( "option", "monthNames" );
    var monthNamesShort = $( ".js-datepicker" ).datepicker( "option", "monthNamesShort" );

    $('.js-datepicker').datepicker({
		firstDay: 1,
		numberOfMonths: 2,
		dateFormat: "yy-mm-dd",
		onSelect: function (date, i) {
			if (date !== i.lastVal) {

				$.post($(".js-datepicker").data("url"), "ajax=Y&curr_event_date=" + date,
					function (html) {
						$('#events-container').html(html);
					});
			}
		},
		dayNames: [ "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресение" ],
		dayNamesMin: [ "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс" ],
		monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь', 'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек']
	});

    $('.js-show-current-week').on('click', ()=> {
		$.post($(".js-datepicker").data("url"), "ajax=Y",
			function (html) {
				$('#events-container').html(html);
			});
	});

    $( ".js-datepicker" ).datepicker( "option", dayNames, [ "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресение" ] );
    $( ".js-datepicker" ).datepicker( "option", dayNamesMin, [ "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс" ] );
    $( ".js-datepicker" ).datepicker( "option", monthNames, ['Январь','Февраль','Март','Апрель','Май','Июнь', 'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'] );
    $( ".js-datepicker" ).datepicker( "option", monthNamesShort, ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'] );


    //Выбор События эта неделя или выбрать дату
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
		focusOnSelect: true,
		vertical: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					vertical: false,
					variableWidth: true
				}
			}
		]
	});

    //Инициализация табов на странице dog-page
    $('#tabs').tabs();

    //Скрытие лэйблов при заполнении инпута
    $('.js-input').on('change', function() {
		if ($(this).val() == '') {
			$(this).next('#label').removeClass('label-none')
		} else {
			$(this).next('#label').addClass('label-none')
		}
	});

    //Инициализация календаря в Личном кабинете
    $('.js-datepicker-personal').datepicker();
    $('#inputBorn').click(function() {
		$('.ui-datepicker').addClass('ui-datepicker-personal');
	});
    $('#inputPetBorn').click(function() {
		$('.ui-datepicker').addClass('ui-datepicker-pets');
	});

    //Инициализация селект меню
    $('.select-activity').selectmenu();
    $('.ui-selectmenu-button').click(function() {
		$(this).children('.ui-selectmenu-icon').toggleClass('icon-rotate');
	});
    $('.ui-selectmenu-menu').click(function() {
		$('.ui-selectmenu-icon').removeClass('icon-rotate');
	});


    $('.publications-select__item').click(function() {
		$(this).toggleClass('item-select');
	})


    $('.add-pets').click(function(e) {
		e.preventDefault();
		$('.page-data__pets').fadeIn();
	});
    $('.pets-info__btn').click(function(e) {
		e.preventDefault();
		$('.page-data__pets').fadeOut();
	})


    //Фильтр на мобильной версии
    $('.filter-mobile').click(function() {
		$(this).next().slideToggle();
	});

    //Комментарии на странице со статьей
    $('.js-add__comment').on('click', function(e) {
		
		e.preventDefault();
		$(this).hide();
		$(this).next('.comments-form').slideDown();
		
	});
	
	//Маски
	$("#inputBorn").mask('00/00/0000');
	$("#inputPetBorn").mask('00/00/0000');	
	$("#inputPhone").mask('+7(000) 000-0000');
	$("#inputPhone2").mask('+7(000) 000-0000');
});
