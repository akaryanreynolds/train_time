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
var time = 0;
var feq = "";


$("#addNewTrain").on("click", function(event) {
  event.preventDefault();

  trainName = $("#trainName").val().trim();
  dest = $("#dest").val().trim();
  feq = $("#feq").val().trim();
  time = $("#time").val().trim();

  var newTrain = {
    Train_Name: trainName,
    Destination: dest,
    Frequency: feq,
    First_Time: time,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  }

  database.ref().push(newTrain);

});

  database.ref().on("child_added", function(childSnapshot) {

    console.log(childSnapshot.val().Train_Name);
    console.log(childSnapshot.val().Destination);
    console.log(childSnapshot.val().First_Time);
    console.log(childSnapshot.val().Frequency);

    $("#userData").append("<div> <span id='trainName'> " + childSnapshot.val().Train_Name + " </span> <span id='dest'> " + childSnapshot.val().Destination + " </span> <span id='feq'> " + childSnapshot.val().Frequency + " </span></div>");


  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);

  })

  database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

    $("#trainName").text(snapshot.val().Train_Name);
    $("#dest").text(snapshot.val().Destination);
    $("#feq").text(snapshot.val().Frequency);
  });



  // Functions




});