//Last updated: Ejay Lai
//Date: Aug 18, 2018
//Use new name of db if table has been changed, e.g. adding new column(s)
 
	var selectAllStatement = "SELECT * FROM tblSurvey";
	var updateStatement = "UPDATE tblSurvey SET q1_ageGroup = ?, q2_activity = ? WHERE id=?";//not in use
	var deleteStatement = "DELETE FROM tblSurvey WHERE id=?"; 
	var dropStatement = "DROP TABLE tblSurvey";
	var db = openDatabase("SurveyDB1", "1.0", "The GreenSpace Project", 5*1024*1024);  // Open SQLite Database
	var dataset;
	var DataType;
	
	// Function Call When Page is ready.
	function initDatabase()
	{ 
		try {
			if (!window.openDatabase)  // Check browser is supported SQLite or not.
			{
				alert('Databases are not supported in this browser.');
			}
			else {
				createTable();  // If supported then call Function for create table in SQLite
			}
		}
		catch (e) {
			if (e == 2) {
				// Version number mismatch. 
				console.log("Invalid database version.");
			} else {
				console.log("Unknown error " + e + ".");
			}
			return;
		}
	}
	
	function createTable()  
	{	
		//drop db before add new colum to table
		//add locHome -for x,y coordintes
		db.transaction(function (tx) { tx.executeSql("CREATE TABLE IF NOT EXISTS tblSurvey (id INTEGER PRIMARY KEY AUTOINCREMENT, q1 TEXT, q2_1 TEXT, q2_1a TEXT, q2_1b TEXT, q2_1c TEXT, q2_1d TEXT, q2_2 TEXT, q2_2a TEXT, q2_2b TEXT,q2_2c TEXT,q2_2d TEXT, q2_3 TEXT, q2_3a TEXT, q2_3b TEXT, q2_3c TEXT,q2_3d TEXT, q3 TEXT, q4 TEXT, q5 TEXT, q6 TEXT,q7 TEXT,q8 TEXT, insertDay DATETIME)", [], showRecords, onError); });
	}
	 
	function insertRecord()
	{
		//var q1_ageGroupVal = $('input:text[id=q1_ageGroup]').val();
		//var q2_activityVal = $('input:text[id=q2_activity]').val();
		//get selected value in a radio group
		var q1 = $("input[type='radio'][name='agegroup']:checked").val();
		//get values from checked checkboxes:
		var selected_value = $('.activity_content:checked').map(function(){ return $(this).val()}).get(); //array
		var q2 = selected_value.join(', ')//turn an array to a list of items
		var q3 = $('#locHome').val();
		
		var insertTS = new Date().toLocaleString('en-US', {timeZone: 'Europe/Berlin'});
		db.transaction(function (tx) { tx.executeSql("INSERT INTO tblSurvey (q1_ageGroup, q2_activity, q3_locHome, insertDay) VALUES (?, ?, ?, ?)", [q1, q2, q3, insertTS], loadAndReset, onError); });
		//tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
	}
	
	function deleteRecord(id) 
	{
		var iddelete = id.toString();
		db.transaction(function (tx) { tx.executeSql(deleteStatement, [id], showRecords, onError); alert("Delete Sucessfully"); });
		resetForm();
	}
	
	// Function for display records which are retrived from database.
	function loadRecord(i) 
	{
		var item = dataset.item(i); 
		$("#q1_ageGroup").val((item['q1_ageGroup']).toString());
		$("#q2_activity").val((item['q2_activity']).toString());
		$("#q3_locHome").val((item['q3_locHome']).toString());
		$("#id").val((item['id']).toString());
	}
	 
	 // Function for reset form input values.
	function resetForm()
	{	
		$('#submitButton').attr('disabled',true);
		$("#q1_ageGroup").val("");
		$("#q2_activity").val("");
		$("#id").val("");
	}
	
	//Function for Load and Reset...
	function loadAndReset() 
	{
		resetForm(); 
		showRecords()
	}
	
	// Function for Hendeling Error...
	function onError(tx, error) 
	{
		alert(error.message);
	}
	 
	// Function For Retrive data from Database Display records as list
	function showRecords()
	{
		//$("#results").html('')
		//var html = $("#tbody01").html('');
		var html = document.getElementById("tbody01");
		//html.innerHTML = "";
		db.transaction(function (tx) {
			tx.executeSql(selectAllStatement, [], function (tx, result) {
				dataset = result.rows;
				var id;
				var q1;
				var q2;
				var q3;
				var insert_ts;
				for (var i = 0, item = null; i < dataset.length; i++) {
					item = dataset.item(i);
					id = item['id'];
					q1 = item['q1_ageGroup'];
					q2 = item['q2_activity'];
					q3 = item['q3_locHome'];
					insert_ts = item['insertDay'];
					
					if (html)
					{
                      html.innerHTML += "<tr><td>" + id + "</td><td>" + q1 + "</td><td>" + q2 + "</td><td>" + q3 + "</td><td>" + insert_ts + "</td></tr>";
                    }
					
					//var linkeditdelete = '<li>' + item['q1_ageGroup'] + ' , '+ item['q2_activity'] + ' , ' + item['insertDay']  + ' ,  ' +'<a //href="#" onclick="deleteRecord(' + item['id'] + ');">delete</a></li>';
					//$("#results").append(linkeditdelete);
				}
			});
		});
	}