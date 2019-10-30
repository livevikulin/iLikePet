import $ from "jquery";


let modalYourCity = $(".js-modal-your-city");
let jsChoosecity = $(".js-choose-city");
let jsCityChange = $(".js-header-city-change");
let jsModalChoose = $(".js-modal-choose");

jsChoosecity.on("click", (e) => {
	let target = $(e.target);

	if (target.hasClass("js-choose-city")) {
		target.toggleClass("open");
		modalYourCity.fadeToggle();
		jsModalChoose.fadeOut();
	}
});

$(".js-header-city-close").on("click", () => {
	modalYourCity.fadeOut();
	jsChoosecity.removeClass("open");
});

$(".js-header-city-confirm").on("click", () => {
	modalYourCity.fadeOut();
	jsChoosecity.removeClass("open");
});

jsCityChange.on("click", () => {
	modalYourCity.fadeOut();
	jsModalChoose.fadeIn();
});

$(".js-header-city-close-choose").on("click", () => {
	jsModalChoose.fadeOut();
	jsChoosecity.removeClass("open");
});
