// Wait for all to load
window.onload = function() {
	
	$(document).ready(function() {

// Initialize Firebase
var config = {
	apiKey: "AIzaSyDEKpOZoE7BIK-zIo4chy4rJmoLn2qDfC4",
	authDomain: "trainschedule-fc255.firebaseapp.com",
	databaseURL: "https://trainschedule-fc255.firebaseio.com",
	projectId: "trainschedule-fc255",
	storageBucket: "trainschedule-fc255.appspot.com",
	messagingSenderId: "40161400689"
};

firebase.initializeApp(config);

var dataRef = firebase.database();

// From the input form, get the values and add to Firebase
$("#addTrainButton").on("click",function(event){
	event.preventDefault();
	trainName = $("#inputTrainName").val().trim();
	trainDestination = $("#inputTrainDestination").val().trim(); 
	trainFirstTimeDeparture = $("#inputTrainFirstTimeDeparture").val().trim();	
	trainFrequency = $("#inputTrainFrequency").val().trim();
// add to Firebase
	dataRef.ref().push({
		trainName: trainName,
		trainDestination: trainDestination,
		trainFirstTimeDeparture: trainFirstTimeDeparture,
		trainFrequency: trainFrequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
});

// Whenever a train is added to the firebase db, append a table row to the html
dataRef.ref().orderByChild("trainName").on("child_added",function(snapshot){

var DBName = snapshot.key;
// console.log("FDB: " + DBName);

// Calculate the nextArrival and minutesAway using NOW and first time departure ex uses 1:50PM as NOW with train every 15 mins
// declare new variables for each record
	var outputTrainDestination = snapshot.val().trainDestination;
	var outputTrainName = snapshot.val().trainName;
// minutesAway
	var outputTrainFirstTimeDeparture = snapshot.val().trainFirstTimeDeparture;
    var trainFirstTimeDepartureInPast = moment(outputTrainFirstTimeDeparture, "hh:mm").subtract(1, "days"); // force time into past
    var difference = moment().diff(moment(trainFirstTimeDepartureInPast), "minutes"); // 13:50 now - 10:15 first departure = 205 mins
    var outputTrainFrequency = snapshot.val().trainFrequency;
    var remainder = difference % outputTrainFrequency;  // ex. 205 mins % 15 freq = 5 remainder
    var minutesAway = outputTrainFrequency - remainder; // ex. 15 freq - 5 remainder = 10 minutes until next train
// nextArrival
    var nextArrival = moment().add(minutesAway, "minutes"); // ex. 13:50 now + 10 minutes away = 14:00

	$("#trainScheduleBody").append(
		"<tr><td>" +  outputTrainName + 
		"</td><td>" +  outputTrainDestination + 
		"</td><td>" + outputTrainFrequency + 
		"</td><td>" +  moment(nextArrival).format("hh:mm") + 
		"</td><td>" +  minutesAway + 
		"</td><td><button type='submit' class='btn btn-default btnRemove' id='" + DBName + "'>Remove</button>" +  
		"</td></tr>");

// delete
// table needs to be manually refreshed
$("#"+DBName).on("click",function(event){
	// console.log("remove train: " + DBName);
	dataRef.ref().child(DBName).remove();
});

// Clear input fields 
	$("#inputTrainName").val("");		
	$("#inputTrainDestination").val(""); 
	$("#inputTrainFirstTimeDeparture").val("");	
	$("#inputTrainFrequency").val("");
});

});
}
