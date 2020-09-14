/**
 * Home.js main code
 * @file
 */

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDqcl7gDUaSFuqGSObgU1O3R4HtAwvubnU",
  authDomain: "homework-e9969.firebaseapp.com",
  databaseURL: "https://homework-e9969.firebaseio.com",
  projectId: "homework-e9969",
  storageBucket: "homework-e9969.appspot.com",
  messagingSenderId: "871520598838",
  appId: "1:871520598838:web:79f75461caab638caa1197",
  measurementId: "G-3KNZKXXYPZ",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

/**
 * The list of all homework.
 * @type {Array<string>}
 */
var homework = [];

/**
 * The firebase collection with all homework.
 */
var homeworkDB = firebase.firestore().collection("homework");

function content(subject) {
  var content = document.getElementById(subject);
  if (content.style.display == "none") {
    content.style.display = "block";
  }
  if (homework.length > 0) {
    var text = document.getElementById(subject + "_text");
    text.innerHTML = homework;
  }
}
function HW(subject) {
  var input = document.getElementById(subject + "_input").value;
  var text = document.getElementById(subject + "_text");
  var date = document.getElementById(subject + "_date").value;
  var final_input = input + " Abgabe am: " + date;
  text.innerHTML += final_input;
  homework.push(final_input);
  uploadData(subject);
}
function löschen(subject) {
  document.getElementById(subject + "_text").innerHTML = "";
  homework = [];
}
function schließen(subject) {
  var content = document.getElementById(subject);
  if (content.style.display == "none") {
    content.style.display = "block";
  } else if (content.style.display == "block") {
    location.reload();
  }
}
function uploadData(subject) {
  homeworkDB.doc(subject).set({
    array: homework,
  });
  alert(homework + " was uploaded to the cloud");
}
