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

  var destination = "";
  var fequency = "";
  var minAway = "";
  var nextArrival = "";
  var trainName = "";

  
