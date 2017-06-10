$(document).ready(function(){

	//MOBILE MENU SLIDEOUT
	$('.mobile-menu').click(function(){
		if ($('nav').css('left') == '-245px') {
			$('nav').animate({left: '0'},500);
		}
		else {
			$('nav').animate({left: '-245px'},500);
		}
	});

	$('nav .hide').click(function(){
		$('nav').animate({left: '-245px'},500);
	});

	//Add indicators to carousel
	var car_cnt = 0;
	$("#carousel .item").each(function(){
		var active_class = "";
		if (car_cnt == 0) {
			$(this).addClass("active");
			active_class = "active";
		}
		$('#carousel .carousel-indicators').append('<li data-target="#carousel-example-generic" data-slide-to="' + car_cnt + '" class="' + active_class + '"></li>');
		car_cnt++;
	});

	 // Javascript to enable link to tab
	var hash = document.location.hash;
	var prefix = "tab_";
	if (hash) {
		window.location = hash.replace(prefix, "");
		$(".nav-pills a[href='" + hash.replace(prefix, "") + "']").tab('show');
	}

	//datepicker
	$('.date input').datepicker({
		autoclose: true
	});

	//AJAX intercept form submissions
	$('form.ajax-form').submit(function(e){
		e.preventDefault();

		var form = $(this);
		var url = $(this).attr("action");
		var payload = $(this).serialize();

		var alert = form.find('.alert');

		alert.removeClass("alert-success alert-danger");
		alert.addClass("alert-info").html("Sending...").slideDown();

		$.post(url, payload, function(response) {
			alert.removeClass("alert-info");
			if (response == "success") {
				alert.addClass("alert-success").html("Your form has been sent!");
				form.trigger("reset");
			}
			else {
				alert.addClass('alert-danger').html("There was a problem sending your form. Pleast try again later");
			}
		});
	});
});