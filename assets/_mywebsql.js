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
 
var _q2_1a;
$('body').on('change','#q2_1a',function(){_q2_1a = this.value;});
var _q2_1b;
$('body').on('change','#q2_1b',function(){_q2_1b = this.value;});
var _q2_1c;
$('body').on('change','#q2_1c',function(){_q2_1c = this.value;});
var _q2_1d;
$('body').on('change','#q2_1d',function(){_q2_1d = this.value;});

var _q2_2a;
$('body').on('change','#q2_2a',function(){_q2_2a = this.value;});
var _q2_2b;
$('body').on('change','#q2_2b',function(){_q2_2b = this.value;});
var _q2_2c;
$('body').on('change','#q2_2c',function(){_q2_2c = this.value;});
var _q2_2d;
$('body').on('change','#q2_2d',function(){_q2_2d = this.value;});

var _q2_3a;
$('body').on('change','#q2_3a',function(){_q2_3a = this.value;});
var _q2_3b;
$('body').on('change','#q2_3b',function(){_q2_3b = this.value;});
var _q2_3c;
$('body').on('change','#q2_3c',function(){_q2_3c = this.value;});
var _q2_3d;
$('body').on('change','#q2_3d',function(){_q2_3d = this.value;});

function insertRecord()
{
	//Q1 - Radiogroup
	var _q1 = $("input[type='radio'][name='q1']:checked").val();	
	//Q2_1
	var _q2_1=$('#q2_1').val();
	//Q2_2
	var _q2_2=$('#q2_2').val();
	//Q2_3
	var _q2_3=$('#q2_3').val();
	
	//q3
	var chkArray = [];
	/* look for all checkboxes that have a class 'q3'  check if it was checked */
	$(".q3:checked").each(function() {
		chkArray.push($(this).val());
	});
	/* join the array separated by the comma */
	var _q3 = chkArray.join(',') ;
	var _q4 = $('#q4').val();
	//Q5
	var _q5 = $('input[name="q5"]:checked').val();
	//Q6
	var _q6 = $('input[name="q6"]:checked').val();
	//Q7
	var _q7 = $('input[name="q7"]:checked').val();
	//Q8
	var _q8 = $('input[name="q8"]:checked').val();
	
	var insertTS = new Date().toLocaleString('en-US', {timeZone: 'Europe/Berlin'});
	db.transaction(function (tx) { tx.executeSql("INSERT INTO tblSurvey (q1,q2_1,q2_1a,q2_1b,q2_1c,q2_1d,q2_2,q2_2a,q2_2b,q2_2c,q2_2d, q2_3,q2_3a,q2_3b,q2_3c,q2_3d,q3,q4,q5,q6,q7,q8,insertDay) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [_q1, _q2_1, _q2_1a,_q2_1b,_q2_1c,_q2_1d,_q2_2,_q2_2a,_q2_2b,_q2_2c,_q2_2d,_q2_3,_q2_3a,_q2_3b,_q2_3c,_q2_3d,_q3,_q4,_q5,_q6,_q7,_q8,insertTS], loadAndReset, onError); });
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
	$("#q1").val((item['q1']).toString());
	$("#q2_1").val((item['q2_1']).toString());
	$("#q2_1a").val((item['q2_1a']).toString());
	$("#q2_1b").val((item['q2_2a']).toString());
	$("#q2_1c").val((item['q2_2c']).toString());
	$("#q2_1d").val((item['q2_2d']).toString());
	
	$("#q2_2").val((item['q2_2']).toString());
	$("#q2_2a").val((item['q2_2a']).toString());
	$("#q2_2b").val((item['q2_2a']).toString());
	$("#q2_2c").val((item['q2_2c']).toString());
	$("#q2_2d").val((item['q2_2d']).toString());
	
	$("#q2_3").val((item['q2_3']).toString());
	$("#q2_3a").val((item['q2_3a']).toString());
	$("#q2_3b").val((item['q2_2a']).toString());
	$("#q2_3c").val((item['q2_2c']).toString());
	$("#q2_3d").val((item['q2_2d']).toString());
	
	$("#q3").val((item['q3']).toString());
	$("#q4").val((item['q3']).toString());
	$("#q5").val((item['q3']).toString());
	$("#q6").val((item['q3']).toString());
	$("#q7").val((item['q3']).toString());
	$("#q8").val((item['q3']).toString());
	
	$("#id").val((item['id']).toString());
}
 
 // Function for reset form input values.
function resetForm()
{	
	$('#submitButton').attr('disabled',true);
	$("#q1").val("");
	$("#q2").val("");
	$("#q3").val("");
	$("#q4").val("");
	$("#q5").val("");
	$("#q6").val("");
	$("#q7").val("");
	$("#q8").val("");
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
	var html = document.getElementById("tbody01");
	db.transaction(function (tx) {
		tx.executeSql(selectAllStatement, [], function (tx, result) {
			dataset = result.rows;
			var id;
			var q1;
			var q2_1;
			var q2_1a;
			var q2_1b;
			var q2_1c;
			var q2_1d;				

			var q2_2;
			var q2_2a;
			var q2_2b;
			var q2_2c;
			var q2_2d;				

			var q2_3;
			var q2_3a;
			var q2_3b;
			var q2_3c;
			var q2_3d;				

			var q3;
			var q4;
			var q5;
			var q6;
			var q7;
			var q8;
			
			var insert_ts;
			
			for (var i = 0, item = null; i < dataset.length; i++) {
				item = dataset.item(i);
				q1=item['q1'];
				q2_1=item['q2_1'];
				q2_1a=item['q2_1a'];
				q2_1b=item['q2_2a'];
				q2_1c=item['q2_2c'];
				q2_1d=item['q2_2d'];
				
				q2_2=item['q2_2'];
				q2_2a=item['q2_2a'];
				q2_2b=item['q2_2a'];
				q2_2c=item['q2_2c'];
				q2_2d=item['q2_2d'];
				
				q2_3=item['q2_3'];
				q2_3a=item['q2_3a'];
				q2_3b=item['q2_2a'];
				q2_3c=item['q2_2c'];
				q2_3d=item['q2_2d'];
				
				q3=item['q3'];
				q4=item['q4'];
				q5=item['q5'];
				q6=item['q6'];
				q7=item['q7'];
				q8=item['q8'];
				
				id = item['id'];
				insert_ts = item['insertDay'];
				
				if (html)
				{
				  html.innerHTML += "<tr><td>" + id + "</td><td>" + q1 + "</td><td>" + q2_1 + "</td><td>"+ q2_1a + "</td><td>"+ q2_1b + "</td><td>"+ q2_1c + "</td><td>"+ q2_1d + "</td><td>"+ q2_2 + "</td><td>"+ q2_2a + "</td><td>"+ q2_2b + "</td><td>"+ q2_2c + "</td><td>"+ q2_2d + "</td><td>"+ q2_3 + "</td><td>"+ q2_3a + "</td><td>"+ q2_3b + "</td><td>" + q2_3c + "</td><td>"+ q2_3d + "</td><td>"+ q3 + "</td><td>"+ q4 + "</td><td>"+ q5 + "</td><td>"+ q6 + "</td><td>"+ q7 + "</td><td>"+ q8 + "</td><td>" + insert_ts + "</td></tr>";
				}
			}
		});
	});
}