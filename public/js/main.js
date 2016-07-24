//var SERVERURL = 'http://192.168.1.151:5100'; /*make a direct call bypassing sequrity for local clients*/
var CONFIG = {};
var SERVER = "";
// www.guttih.com ip 89.17.157.231


function logger(str){
	console.log("Logger : "+ str);
}

$('#btnSetStarted').click(function() {
	getWhenServerStarted();
});
$('#btnGetDevices').click(function() {
	getUserDeviceList();
});

var serverStartedTime;

function formaTima(d) {
var str =  d.getDate() + "." + (d.getMonth()+1) + "." + d.getFullYear() + " " +
			d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

return str;
}

function msToStr(duration) {
	var milliseconds = parseInt((duration%1000)/100), 
		seconds = parseInt((duration/1000)%60),
		minutes = parseInt((duration/(1000*60))%60), 
		hours   = parseInt((duration/(1000*60*60))%24),
		days    = parseInt((duration/(1000*60*60*24)));

	days   = (days   < 10) ? "0" + days : days;
	hours   = (hours   < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;
	var str = "";
	if (days > 0) {str+=days+" days ";}
	if (hours > 0) {str+=hours+" hrs ";}
	if (minutes > 0) {str+=minutes+" min ";}
	str+=seconds+" sec";
	return days + "d:" + hours + "h:" + minutes + "m:" + seconds + "s";
	//return str;
}

function updateServerRunningtime(){
	var now = new Date(); //"now"
	var diff = Math.abs(now - serverStartedTime);
	$('#serverRunning').text(msToStr(diff));
}
function setServerStartedValue(date){
	console.log("date");
	console.log(date);
	serverStartedTime = new Date(date.year, date.month-1, date.day, date.hours, date.minutes, date.seconds, 0);
	
	$('#serverStarted').text(formaTima(serverStartedTime));
	updateServerRunningtime();
	
}


function getUserDeviceList(){
	var url = SERVER+'/devices/list';
		var request = $.get(url);
	request.done(function( data ) {
		// Put the results in a div
		setDevicelistValues(data);
		}).fail(function( data ) {

		if (data.status===401){
			showModal("You need to be logged in!", data.responseText);
		}
		});
}

function setDevicelistValues(devicelist){

	//$("#devicelist option").remove();
	var key, name, shallDisable = true;
	$("#devicelist").empty().prop( "disabled", true );
	for(var i = 0; i < devicelist.length; i++){
		shallDisable=false;
		console.log(devicelist[i]);
		
		key = devicelist[i].id;
		name = devicelist[i].name;
		$('#devicelist')
			.append($('<option>', { value : JSON.stringify(devicelist[i])})
			.text(name));
	}
	$('#devicelist').prop( "disabled", shallDisable );
	$("#devicelist option").each(function(item){
			console.log(item);
		// Add $(this).val() to your list
	});
}

function getWhenServerStarted(){
var url = SERVER+'/devices/started';
var selected = $( "#devicelist" ).val();
if (selected===undefined){
	console.log("NOTHING selected");
	return;
}
selected = JSON.parse(selected);
console.log("selected");
console.log(selected);
	var request = $.get(SERVER+'/devices/started/'+selected.id);
	
request.done(function( data ) {
	// Put the results in a div
	setServerStartedValue(data.date);
	}).fail(function( data ) {

	if (data.status===401){
		showModal("You need to be logged in!", data.responseText);
	}
	});
}

function showModal(title, message){
		console.log("------------------showModal------------------");
	$(".modal-title").text(title);
	$(".modal-body").text(message); 
	$('#myModal').modal('show');
}

$(function () {  
	/* this is the *$( document ).ready(function( $ ) but jshint does not like that*/
	var SERVER = window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port: '');
	//todo: run this only if logged in getWhenServerStarted();
});
