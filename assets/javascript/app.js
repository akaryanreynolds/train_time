$(document).ready(function() {

// Initialize Firebase
var config = {
  apiKey: "AIzaSyABCtO1Z_6GRLLD_88LmbpnxQH0i7jx2R8",
  authDomain: "train-time-e38aa.firebaseapp.com",
  databaseURL: "https://train-time-e38aa.firebaseio.com",
  projectId: "train-time-e38aa",
  storageBucket: "train-time-e38aa.appspot.com",
  messagingSenderId: "125357553594"
};

firebase.initializeApp(config);

var database = firebase.database();

// Initial Values
var trainName = "";
var dest = "";
var firstTime = 0;
var freq = "";


$("#addNewTrain").on("click", function(event) {
  event.preventDefault();

  trainName = $("#trainName").val().trim();
  dest = $("#dest").val().trim();
  freq = $("#freq").val().trim();
  firstTime = $("#firstTime").val().trim();
  minutesAway();

  var newTrain = {
    Train_Name: trainName,
    Destination: dest,
    Frequency: freq,
    First_Time: firstTime,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  }

  database.ref().push(newTrain);

});

  database.ref().on("child_added", function(childSnapshot) {

    console.log(childSnapshot.val().Train_Name);
    console.log(childSnapshot.val().Destination);
    console.log(childSnapshot.val().First_Time);
    console.log(childSnapshot.val().Frequency);

    $("#userData").append("<div> <span> " + childSnapshot.val().Train_Name + " </span> <span> " + childSnapshot.val().Destination + " </span> <span> " + childSnapshot.val().Frequency + " </span> <span> " + localStorage.getItem("next_train") + " </span> <span> " + localStorage.getItem("min_away") + " </span></div>");


  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);

  })

  database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

    $("#trainName").text(snapshot.val().Train_Name);
    $("#dest").text(snapshot.val().Destination);
    $("#freq").text(snapshot.val().Frequency);
  });



 // Functions (used from class)
 function minutesAway(){

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "days");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    localStorage.clear();
    localStorage.setItem("next_train", nextTrain);
    localStorage.setItem("min_away", tMinutesTillTrain);
}




});