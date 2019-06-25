import  $ from "jquery";

import "@fancyapps/fancybox/dist/jquery.fancybox";
// require("fancybox");

// var $ = require('jquery');
// require('fancybox')($)

// Initialise imported function as jQuery function
// $.fn.fancybox = fancybox;


$(document).ready(function() {

	$('[data-fancybox]').fancybox({
	
		helpers : {
            media : {}
        },
	
	});

});