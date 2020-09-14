
var homework = [];

function content(subject){
    var content = document.getElementById(subject);
     if (content.style.display == 'none'){
        content.style.display = 'block';
    }  
    if (homework.length > 0){
        var text = document.getElementById(subject + '_text');
        text.innerHTML = homework;
    }
}
function HW(subject){
    var input = document.getElementById(subject + '_input').value;
    var text = document.getElementById(subject + '_text');
    var date = document.getElementById(subject+ '_date').value;
    var final_input = input + ' Abgabe am: ' + date;
    text.innerHTML += final_input;
    homework.push(final_input);
    uploadData()
}
function löschen(subject){
    document.getElementById(subject + '_text').innerHTML = '';
    homework = [];
}
function schließen(subject){
    var content = document.getElementById(subject);
    if (content.style.display == 'none'){
        content.style.display = 'block';
    }
    else if (content.style.display == 'block'){
        location.reload();
    }
}
function uploadData(subject) {
    var homarray = homework;
    firebase.database().ref('kurse/' + subject).set({
      array: homarray
    });
    alert(homarray + ' was uploaded to the cloud');
  }
