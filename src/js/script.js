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


$(document).ready(function () {

	//Кнопка "НАВЕРХ"
	const $toTopButton = $(".js-to-top-link");

	if ($toTopButton.length) {
		let scrollTrigger = 20, // px
			backToTop = () => {
				var scrollTop = $(window).scrollTop();

				if (scrollTop > scrollTrigger) {
					$toTopButton.addClass("topper_active");
				} else {
					$toTopButton.removeClass("topper_active");
				}
			};

		backToTop();

		$(window).on("scroll", () => {
			backToTop();
		});

		$toTopButton.on("click", (e) => {
			e.preventDefault();

			$("html,body").animate({
				scrollTop: 0
			}, 700);
		});
	}

	//Инициализация fancybox
	$("[data-fancybox]").fancybox({
		helpers: {
			media: {}
		},
	});

	//Открытие / Закрытие модалки с благодарностью	
	$(window).on("sendshow", function () {
		$.fancybox.open({

			src: "#thanks",
			type: "inline"

		});
	});

	$(".comments-form__btn").click(function () {
		$(this).trigger("sendshow");
	});

	$(".thanks__btn").on("click", function () {
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
		values: [dataValueMin, dataValueMax],
		stop: function (event, ui) {
			$("input#minCost").val(sliderRange.slider("values", 0));
			$("input#maxCost").val(sliderRange.slider("values", 1));
		},
		slide: function (event, ui) {
			$("input#minCost").val(sliderRange.slider("values", 0));
			$("input#maxCost").val(sliderRange.slider("values", 1));
		}
	});
	$("input#minCost").change(function () {
		var value1 = $("input#minCost").val();
		var value2 = $("input#maxCost").val();

		if (parseInt(value1) > parseInt(value2)) {
			value1 = value2;
			$("input#minCost").val(value1);
		}
		sliderRange.slider("values", 0, value1);
	});
	$("input#maxCost").change(function () {
		var value1 = $("input#minCost").val();
		var value2 = $("input#maxCost").val();

		if (value2 > 10) {
			value2 = 10;
			$("input#maxCost").val(10);
		}
		if (parseInt(value1) > parseInt(value2)) {
			value2 = value1;
			$("input#maxCost").val(value2);
		}
		sliderRange.slider("values", 1, value2);
	});

	$("input#minCost").keypress(function (e) {
		if (e.which != 8 && e.which != 0 && e.which != 46 && (e.which < 48 || e.which > 57)) {
			return false;
		}
	});
	$("input#maxCost").keypress(function (e) {
		if (e.which != 8 && e.which != 0 && e.which != 46 && (e.which < 48 || e.which > 57)) {
			return false;
		}
	});

	//Календарь на странице с событиями
	var dayNames = $(".js-datepicker .js-datepicker-personal").datepicker("option", "dayNames");
	var dayNamesMin = $(".js-datepicker .js-datepicker-personal").datepicker("option", "dayNamesMin");
	var monthNames = $(".js-datepicker .js-datepicker-personal").datepicker("option", "monthNames");
	var monthNamesShort = $(".js-datepicker .js-datepicker-personal").datepicker("option", "monthNamesShort");

	$.datepicker.setDefaults({
		dateFormat: 'dd.mm.yy'
	});

	$(".js-datepicker").datepicker({
		firstDay: 1,
		numberOfMonths: 2,
		dayNames: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресение"],
		dayNamesMin: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
		monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
		monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
		beforeShowDay: function (date) {
			var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#dateStart").val());
			var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#dateEnd").val());
			return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "datepicker-highlight" : ""];
		},
		onSelect: function (date, i) {
			var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#dateStart").val());
			var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#dateEnd").val());
			var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, date);

			if (!date1 || date2) {
				$("#dateStart").val(date);
				$("#dateEnd").val("");
				$(this).datepicker();
			} else if (selectedDate < date1) {
				$("#dateEnd").val($("#dateStart").val());
				$("#dateStart").val(date);
				$(this).datepicker();

				$.post($(".js-datepicker").data("url"), "ajax=Y&event_date_start=" + $("#dateStart").val() + '&event_date_end=' + $("#dateEnd").val(),
					function (html) {
						$("#events-container").html(html);
					});
			} else {
				$("#dateEnd").val(date);
				$(this).datepicker();

				$.post($(".js-datepicker").data("url"), "ajax=Y&event_date_start=" + $("#dateStart").val() + '&event_date_end=' + $("#dateEnd").val(),
					function (html) {
						$("#events-container").html(html);
					});
			}
		}
	});

	$(".js-show-current-week").on("click", () => {
		$.post($(".js-datepicker").data("url"), "ajax=Y",
			function (html) {
				$("#events-container").html(html);
			});
	});

	$(".js-datepicker .js-datepicker-personal").datepicker("option", dayNames, ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресение"]);
	$(".js-datepicker .js-datepicker-personal").datepicker("option", dayNamesMin, ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]);
	$(".js-datepicker .js-datepicker-personal").datepicker("option", monthNames, ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]);
	$(".js-datepicker .js-datepicker-personal").datepicker("option", monthNamesShort, ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]);

	//Выбор События эта неделя или выбрать дату
	$(".events-week__this").click(function (e) {
		e.preventDefault();
		$(this).addClass("events-pick__week");
		$(".events-week__other").removeClass("events-pick__week");
		$(".events-calendar").slideUp();
	});
	$(".events-week__other").click(function (e) {
		e.preventDefault();
		$(this).addClass("events-pick__week");
		$(".events-week__this").removeClass("events-pick__week");
		$(".events-calendar").slideDown();
	});

	//Фильтр
	$(".filter-box__item").click(function () {
		$(this).next().slideToggle();
		$(this).parent().toggleClass("filter-box_closed");
		$(this).children(".fas").toggleClass("rotate180");
	});

	//Инициализация slick-slider
	$(".dog-page-slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: true,
		asNavFor: ".dog-page-slider__nav",
	});
	$(".dog-page-slider__nav").slick({
		slidesToShow: 6,
		asNavFor: ".dog-page-slider",
		focusOnSelect: true,
		arrows: true,
		vertical: true,
		responsive: [
			{
				breakpoint: 769,
				settings: {
					vertical: false,
					variableWidth: true,
					arrows: false,
				}
			}
		]
	});

	//Инициализация табов на странице dog-page
	$("#tabs").tabs();
	//declaration-more page
	// show all module
	$(".show-more").on("click", function () {
		$(this).hide();
		$(this).prev().css("width", "unset");
	});
	//declaration-more page END



	//service page
		$('.services__list').click(function(e){
			AnimateTags(e);
		})



		$('.service-tag-line').click(function(e){
			AnimateTags(e);
		})


		function AnimateTags(e) {
			let target = $(e.target);
			if(target.hasClass('js-open-more')) {
				e.preventDefault();
				target.toggleClass('open-more-active');
				let container = target.parent().parent();
				let open = target.hasClass('open-more-active');
				let borderOpen = target.data('more');
				let items = target.parent().children();

				items.each(function(i,item){
					let node = $(item);
					if(node.hasClass('open-more')) {
						return;
					}
					if(open){
						node.css('max-width', "430px");
						node.fadeIn();
						node.css('display', "inline-block");
						container.addClass('services__item_open');
						target.text('<--');

					} else if(!open	) {
						i >= borderOpen ? node.fadeOut() :"";
						node.css('max-width', "308px");
						container.removeClass('services__item_open');
						target.text('...');
					}			
				})
				
			}
		}
	//service page

	//store page
	// store-slider module
	let sliderStore = $(".sllider-brands");
	sliderStore.slick({
		arrows: false,
		variableWidth: true,
	});

	$(".slider-back").on("click", function () {
		sliderStore.slick("slickPrev");
	});
	$(".slider-next").on("click", function () {
		sliderStore.slick("slickNext");
	});



	$(".filter-box__show-all").on("click", function (e) {
		e.preventDefault();

		$(".filter-box__show-all").on('click', function (e) {
			e.preventDefault();
			//filter-box__show-all_closed
			let msg = $(this).hasClass('filter-box__show-all_closed') ? 'Скыть' : 'Показать еще';
			$(this).children(':first').text(msg);
			$(this).prev().find('li').each(function (i, item) {
				if (i > 3) {
					$(".filter-box__show-all").hasClass('filter-box__show-all_closed') ? $(item).show() : $(item).hide();
				}
			})
			$(this).toggleClass('filter-box__show-all_closed');
		})
		//store page end
		$(this).toggleClass("filter-box__show-all_closed");
	});
	//store page end

	//product card page
	//slider module
	$(".product-card__slider-block").slick({
		slidesToShow: 1,
		arrows: false,
		fade: true,
		asNavFor: ".product-slider__nav"
	});

	$(".product-slider__nav").slick({
		slidesToShow: 2,
		asNavFor: ".product-card__slider-block",
		variableWidth: true,
		focusOnSelect: true
	});
	//modaul module
	$(".product-card__buy-click").on('click', function () {
		$(".produc-modal-wrapper").show();
	})
	$(".product-modal__close").on('click', function () {
		$(".produc-modal-wrapper").hide();
	})
	//product card end


	//checkout page


	let dataOrder = {};
	let lines = $('.order-line').find('.order-line__item');
	let activeItem = 1;
	let lastActiveItem = 0;
	let _CARD = ['location', 'delivery', 'payment', 'contact', 'confirm'];

	setActiveLine(activeItem)
	setActiveCard(activeItem)
	addListenerOnActiveCard(activeItem);

	function setActiveLine(activeItem) {
		$(lines).each((i, item) => {
			$(item).data('checkout') === activeItem ? $(item).addClass('order-line__item_active order-line__item_now') : '';
			$(item).data('checkout') === lastActiveItem ? $(item).removeClass('order-line__item_now') : '';
		})
	}

	function setActiveCard(activeItem) {
		$(`.order-info_${_CARD[lastActiveItem - 1]}`).fadeOut(0);
		$(`.order-info_${_CARD[activeItem]}`).fadeOut(0);
		$(`.order-info_${_CARD[activeItem - 1]}`).fadeIn(300);

	}

	function addListenerOnActiveCard(activeItem) {
		$(`.order-info_${_CARD[activeItem - 1]}`).find('.order-info__next').on('click', nextStep);
		$(`.order-info_${_CARD[activeItem - 1]}`).find('.order-info__back').on('click', backStep);
	}

	function nextStep(e) {
		//Если пользователь на последней карточке
		if (activeItem === _CARD.length) {
			makeRequestForOrder();
			return;
		}
		checkDataOrder(activeItem);
		$(`.order-info_${_CARD[activeItem - 1]}`)
		$('.order-info__next').off('click');
		$('.order-info__back').off('click');

		lastActiveItem = activeItem;
		activeItem++;

		setActiveLine(activeItem)
		setActiveCard(activeItem)
		addListenerOnActiveCard(activeItem)
	};


	function checkDataOrder(activeItem) {
		switch (activeItem) {
			case 1:
				dataOrder.location = $('.order-info__input_city').val();
				break;
			case 2:
				let msk = $('#Msk_Piter').prop("checked");
				let other = $('#other_city').prop("checked");
				let when = msk === true ? msk : other === true ? false : undefined;
				dataOrder.delivery = {
					adress: $('.order-info__input_delivery').val(),
					msk_sbp: when,
					courier: !$('.order-info__btn_onfoot').hasClass('order-info__btn_active')
				};
				break;
			case 3:
				dataOrder.cash = $('.order-info__btn_cash').hasClass('order-info__btn_active');
				break;
			case 4:
				dataOrder.about = {
					name: $('.order-info__input_name').val(),
					phone: $('.order-info__input_phone').val(),
					email: $('.order-info__input_email').val(),
					comment: $('.order-info__input_text').val(),
				};
				break;
			default:
				break;
		}
	}

	//checkout page end
	
	
	//pesonal page
		//Делегирование событий
		$('.table-order__wrapper').on('click',function(e){
			if(e.target.className === "table-order__check") {
				let link = $(e.target);
				let item =  $(e.target).parent();
				let id = $(e.target).data("open");
				let inner = $(`.table-order__inner[data-open="${id}"]`);
				if(!inner.hasClass('table-order__inner_active')) {
					inner.fadeIn(100);
					item.addClass("table-order__item_active")
					inner.addClass('table-order__inner_active');
					link.css("opacity","0");
					
				}
			}

			if(e.target.className === "table-inner__collapse") {
				let inner = $(e.target).parent().parent();
				let id = inner.data("open");
				let link = $(`.table-order__check[data-open="${id}"]`);
				let item = link.parent();
				if(inner.hasClass('table-order__inner_active')) {
					inner.fadeOut(100);
					inner.removeClass('table-order__inner_active');
					item.removeClass("table-order__item_active");
					link.css("opacity","1");
				}
			}
		});
	//pesonal page





	function backStep(e) {

		//Если нажал назад, а такой карточки нет
		if (activeItem === 1) {
			return;
		}

		$('.order-info__next').off('click');
		$('.order-info__back').off('click');

		removeActiveLine(activeItem)
		activeItem--;
		lastActiveItem--;
		setActiveLine(activeItem);
		setActiveCard(activeItem);
		addListenerOnActiveCard(activeItem)
	};

	function removeActiveLine(activeItem) {
		$(lines).each((i, item) => {
			$(item).data('checkout') === activeItem ? $(item).removeClass('order-line__item_active order-line__item_now') : '';
		})
	}


	//Костыли для кнопок
	$('.order-info__delivery').on('click', function (e) {
		let target = $(e.target);
		if (target.hasClass('order-info__btn')) {
			if(!target.data('active')) {
				btnDeliveryClear();
				target.attr('data-active',true);
				target.addClass('order-info__btn_active')
				chekcDeliveryActive(target);
			}
		}
	})

	function btnDeliveryClear(){
		[].forEach.call(document.querySelectorAll('.order-info__btn'),function(item){
			if(item.dataset.active){
				item.classList.remove('order-info__btn_active');
				item.dataset.active = false;
			}
		})
	}

	function chekcDeliveryActive(target) {
			if(target.hasClass('order-info__btn_onfoot')){
				$('.order-info__where').fadeOut();
				$('.oncar-lable').fadeIn();
				$('.oncar-lable-title').fadeIn();

				$('.punct-delivery').hide();
				$('.punct-delivery_to-door').hide();
			}
			if(target.hasClass('order-info__btn_oncar')) {
				$('.oncar-lable').fadeOut();
				$('.oncar-lable-title').fadeOut();
				$('.order-info__where').fadeIn();
			}
		
	}

	$('.order-info__where').click(function(e){
		if(e.target.id === "Msk_Piter") {
			$('.punct-delivery').fadeIn();
			$('.punct-delivery_to-door').hide();
		}

		if(e.target.id === "other_city") {
			$('.punct-delivery').hide();
			$('.punct-delivery_to-door').fadeIn();
		}
	})

	$('.order-info__payment').on('click', function (e) {
		if ($(e.target).hasClass('order-info__btn')) {
			$('.order-info__btn_cash').removeClass('order-info__btn_active');
			$('.order-info__btn_cashless').removeClass('order-info__btn_active');
			$(e.target).addClass('order-info__btn_active');
		}
	})

	function showModalCheckOut(){
		$(".js-modal-checkout").fadeIn();
		$('.js-modal-checkout .product-modal__close').click(function(){
			$(".js-modal-checkout").fadeOut();
		})
	}

	//Функция для запроса
	function makeRequestForOrder() {
		showModalCheckOut();
	}

	//checkout page


	function inputRefresh($el) {
		if ($el.val() == "") {
			$el.siblings("label").removeClass("label-none");
		} else {
			$el.siblings("label").addClass("label-none");
		}
	}

	function inputRefreshByEvents(e) {
		const $el = $(e.target);
		inputRefresh($el);
	}


	//Скрытие лэйблов при заполнении инпута
	$(".input input").on("change", inputRefreshByEvents);

	$(".input input").each((i, el) => {
		const $el = $(el);
		inputRefresh($el);
	});

	$(document).on('click', '#initSelect', () => {
		$(".input input").each((i, el) => {
			const $el = $(el);
			inputRefresh($el);
		});
	});

	//Инициализация календаря в Личном кабинете
	$(".js-datepicker-personal").datepicker({ 
		dateFormat: "dd.mm.yy",
		dayNames: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресение"],
		dayNamesMin: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
		monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
		monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
	});

	$("#inputBorn").click(function () {
		$(".ui-datepicker").addClass("ui-datepicker-personal");
	});

	$("#inputPetBorn").click(function () {
		$(".ui-datepicker").addClass("ui-datepicker-personal");
	});

	function initSelect() {
		//Инициализация селект меню
		$(".js-select").selectmenu({
			select: function (event, ui) { }
		});
		$(".ui-selectmenu-button").click(function () {
			$(this).children(".ui-selectmenu-icon").toggleClass("icon-rotate");
		});
		$(".ui-selectmenu-menu").click(function () {
			$(".ui-selectmenu-icon").removeClass("icon-rotate");
		});

		$("#category_select").trigger("selectmenuchange");
	}

	initSelect();

	$(document).on('click', '#initSelect', () => {
		initSelect();
	});

	$(document).on("selectmenuchange", "#category_select", function (e) {
		const $el = $(e.target);
		const url = $el.data("url");
		const sectId = $el.val();
		const $breed_select = $("#breed_select");
		$breed_select.html("");
		$breed_select.selectmenu("refresh");
		$breed_select.selectmenu("option", "disabled", true);

		$.post(url, "get_pets=" + sectId, function (data) {
			if (data) {
				let select_html = "";
				let breed_select_current_value = parseInt($("#breed_select_current_value").val());
				for (let i = 0; i < data.length; i++) {
					if (breed_select_current_value == data[i].ID) {
						select_html += "<option value='" + data[i].ID + "' selected>" + data[i].NAME + "</option>";
					} else {
						select_html += "<option value='" + data[i].ID + "'>" + data[i].NAME + "</option>";
					}


					$breed_select.html(select_html);
					$breed_select.selectmenu("refresh");
					$breed_select.selectmenu("option", "disabled", false);
				}
			}
		});
	});


	$(".publications-select__item").click(function () {
		$(this).toggleClass("item-select");
	});

	//
	// $(".js-add_pets").click(function (e) {
	// 	e.preventDefault();
	// 	$(".page-data__pets").fadeIn();
	// });
	// $(".pets-info__btn").click(function (e) {
	// 	e.preventDefault();
	// 	$(".page-data__pets").fadeOut();
	// });




	//Фильтр на мобильной версии
	$(".filter-mobile").click(function () {
		$(this).next().slideToggle();
	});

	//Комментарии на странице со статьей
	$(".js-add__comment").on("click", function (e) {

		e.preventDefault();
		$(this).hide();
		$(this).next(".comments-form").slideDown();

	});

	//Маски
	$("#inputBorn").mask("00.00.0000");
	$("#inputPetBorn").mask("00.00.0000");
	$("#inputPhone").mask("+7(000) 000-0000");
	$("#inputPhone2").mask("+7(000) 000-0000");	

	//Смена вход/регистрация
	$('.signin').on('click', function() {
		$('.login').removeClass('choice-active');
		$(this).addClass('choice-active');
		$('.form-login').removeClass('form-active');
		$('.form-registration').addClass('form-active');
	});
	$('.login').on('click', function() {
		$('.signin').removeClass('choice-active');
		$(this).addClass('choice-active');
		$('.form-registration').removeClass('form-active');
		$('.form-login').addClass('form-active');
	});

	let $label = $('#loginName, #loginPassword');

	$label.on('change', function() {
		if ($(this).val() != '') {
			$(this).next().css('display', 'none');
		} else {
			$(this).next().css('display', 'block');
		}
	});
});
