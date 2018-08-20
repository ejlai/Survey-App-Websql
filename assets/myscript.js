$(document).ready(function(){
    var current = 0,current_step,next_step,steps;//1
	steps = $("fieldset").length - 1;
	var animating;
	
	$(".next").click(function(){
		//ADD VALIDATION
		
		var form = $(".surveyForm");

		
		form.validate({
			rules:{
				q1:{required: true, minlength:1},
				q2:{required: true, minlength:1},
				q3:{required: true, minlength:1},
				q4:{required: true, minlength:1},
				q5:{required: true, minlength:1},
				q6:{required: true, minlength:1},
				q7:{required: true, minlength:1},
				q8:{required: true, minlength:1}
			},
			messages:{
				q1:{required: "Please choose one"},
				q2:{required: "Please add 1 - 3 greenspaces"},
				q3:{required: "Please check at lease one"},
				q4:{required: "Please check at lease one"},
				q5:{required: "Please click on marker to add house location"},
				q6:{required: "Please choose one"},
				q7:{required: "Please choose one"},
				q8:{required: "Please choose one"}
			},
			errorElement : 'span',
			errorLabelContainer: '.errorTxt'
		});
		
		if((!form.valid())){
			return false;
		}
		
		current_step = $(this).parent();
		next_step = $(this).parent().next();
		
		next_step.show();
		setProgressBar(++current);	
		
		current_step.hide();

		
		//$(this).find('.required').attr('required', true); //false | true
		//console.log("IR");
			

	});
	
	$(".previous").click(function(){
		current_step = $(this).parent();
		next_step = $(this).parent().prev();
		next_step.show();
		current_step.hide();
		setProgressBar(--current);
	});
	setProgressBar(current);
	// PROGRESS BAR
	function setProgressBar(curStep){
		var percent = parseFloat(100 / steps) * curStep;
		percent = percent.toFixed();
		$(".progress-bar")
			.css("width",percent+"%")
			.html(percent+"%");		
	}
	
	//webSQL
	initDatabase();
	$( "#surveyForm" ).submit(function(event) {
	  //Insert data to DB
	  event.preventDefault();
	  insertRecord();  
	  setTimeout(function(){
        $(".container").html('<h2>Thank you!</h2><p>Thank you for your participation! Your answers have been submitted successfully.</p>');
		//$('form')[0].reset();
       },500);
	  
	});
	
	$('#previousMap').click(function(e){
		map.invalidateSize();
	});

	
	//showHome
	/*
	$('#showMapHome').click(function(e){
		//map.invalidateSize();
		initMap('mapDiv');	
	}
	*/
	
	//map#2
	$('#showGreensMap').click(function(e){
		//initMap('mapDiv1');
		//map.invalidateSize();
	});	
	
});

$("#get_mapGS").click(function(){
	$("#get_mapGS").empty();
	$.getScript("map2/mapGreenSpaces.js");

});

$("#showMapHome").click(function(){
  $.getScript("map2/mapHome.js");
});

var num =0;
var gsNameId;
$("#btnAddGS").click(function(){
	num++;
	$.getScript("map2/questions.js");
});
