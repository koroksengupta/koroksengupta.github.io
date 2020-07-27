/*
	Miniport by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('#nav a, .scrolly').scrolly({
			speed: 1000,
			offset: function() { return $nav.height(); }
		});

})(jQuery);
$( document ).ready(function() {
	$( "ul.timeline" ).each(function() {
		TotalHeight = 0;
		$(this).find(".timeline__item").each(function() {
			TotalHeight += $(this).height() + 28;
		});
		$(this).find(".timeline__item .before").height(TotalHeight - $(this).find(".timeline__item:last-child").height());
		$(this).find(".timeline__step__marker:last-child").css("background-color","#F38630");
	});
});
