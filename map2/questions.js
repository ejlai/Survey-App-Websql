if(num < 4){
	//id q2_1, q2_1a, q2_1b,q2_1c, q2_1d
	//id q2_2
	//id q2_3
	//"<input id='gsName" + num
	var _id = 'q2_' + num;
	$('#addQuestions').append(
		'<br />' + '<input id="'+_id+'" type="text" name="'+_id+'" placeholder="name of greenspace" style="width:150px;border: 0;  outline: 0;  background: transparent;  border-bottom: 1px solid black;" autofocus/>'
	);

	//frequency of visiting
	var frequency_of_visit = {0:'less than once a month',1:'1-2 times a month',2:'once a week', 3:'more often than once a week'};
	//how to get there
	var means_of_travel = {0:'On foot',1:'by bike',2:'by cars', 3:'public transport'};
	//what do dou do?
	var reasons_of_visit = {0:'walking/hiking/jogging',1:'ball sports',2:'relaxation purposes',3:'social activities',4:'culture activities'};
	//time takes for visiting
	var time_takes = {0:'<=10',1:' 11-20',2:'21-30',3:'31-40',4:'>40'};

	//a. How often do you visit..
	var s = $('<select id="'+_id+'a" />'); 
	$(s).append('<option value="" disabled selected>How often do you visit...</option>') //here
	for(var i in frequency_of_visit) 
	{    
	 $('<option />', {value: frequency_of_visit[i], text: frequency_of_visit[i]}).appendTo(s); 
	} 

	s.appendTo('#addQuestions');

	//b. How do you there?
	var s1 = $('<select id="'+_id+'b" />'); 
	$(s1).append('<option value="" disabled selected>How to get there?</option>')
	for(var i in means_of_travel) 
	{    
	 //$('<option />', {value: val, text: data1[val]}).appendTo(s1); 
	 $('<option />', {value: means_of_travel[i], text: means_of_travel[i]}).appendTo(s1); 
	} 

	s1.appendTo('#addQuestions');

	//c. How long does it take?
	var s2 = $('<select id="'+_id+'c" />'); 
	$(s2).append('<option value="" disabled selected>How long to get there?</option>')
	for(var i in time_takes) 
	{    
	 //$('<option />', {value: val, text: data1[val]}).appendTo(s1); 
	 $('<option />', {value: time_takes[i], text: time_takes[i]}).appendTo(s2); 
	} 

	s2.appendTo('#addQuestions');		


	//d. Which activities do you do?
	var s3 = $('<select id="'+_id+'d" />'); 
	$(s3).append('<option value="" disabled selected>What to do there?</option>')
	for(var i in reasons_of_visit) 
	{    
	 //$('<option />', {value: val, text: data1[val]}).appendTo(s1); 
	 $('<option />', {value: reasons_of_visit[i], text: reasons_of_visit[i]}).appendTo(s3); 
	} 

	s3.appendTo('#addQuestions');		

	/*
	$('body').on('change','#visitOften',function(){
	//alert(this.value);
	$('#gsFrequency').val(this.value);
	});

	$('body').on('change','#visitMeans',function(){
	$('#gsMeans').val(this.value);
	});

	$('body').on('change','#visitTime',function(){
	$('#gsTime').val(this.value);
	});	

	$('body').on('change','#visitReason',function(){
	$('#gsReason').val(this.value);
	});		
	*/
	setInputFocus(_id);	
}else{
	$('#btnAddGS').prop("disabled",true);
}


function setInputFocus(field_id){
	$('input["name="'+field_id+'"]').focus();	
}