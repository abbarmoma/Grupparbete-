var mybutton = document.getElementById("myBtn");


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}


function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

let database = firebase.database()
 
let temp1 = database.ref('temps/temp1');
let humid1 = database.ref('humidity/humidity1')
 
temp1.on('value', function(snapshot) {
updateTemp1(snapshot.val());
});
 
humid1.on('value', function(snapshot) {
updateHumid1(snapshot.val());
});
 
function updateTemp1(value) {
  let t = document.getElementById('temp1')
  if(t != null) {
    t.innerHTML = Math.round(value*10)/10 + ('°C')
  }
}
 
function updateHumid1(value) {
let t = document.getElementById('humidity1')
if(t != null) {
  t.innerHTML = Math.round(value*10)/10 + ('%')
}
}
let temp2 = database.ref('temps/temp2');
let humid2 = database.ref('humidity/humidity2')
 
temp2.on('value', function(snapshot) {
updateTemp2(snapshot.val());
});
 
humid2.on('value', function(snapshot) {
updateHumid2(snapshot.val());
});
 
function updateTemp2(value) {
let t = document.getElementById('temp2')
if(t != null) {
  t.innerHTML = Math.round(value*10)/10 + ('°C')
}
}
 
function updateHumid2(value) {
let t = document.getElementById('humidity2')
if(t != null) {
  t.innerHTML = Math.round(value*10)/10 + ('%')
}
}
let temp3 = database.ref('temps/temp3');
let humid3 = database.ref('humidity/humidity3')
 
temp3.on('value', function(snapshot) {
updateTemp3(snapshot.val());
});
 
humid3.on('value', function(snapshot) {
updateHumid3(snapshot.val());
});
 
function updateTemp3(value){
let t = document.getElementById('temp3')
if(t != null) {
  t.innerHTML = Math.round(value*10)/10 + ('°C')
}
}
 
function updateHumid3(value) {
let t = document.getElementById('humidity3')
if(t != null) {
  t.innerHTML = Math.round(value*10)/10 + ('%')
}
}
let temp4 = database.ref('temps/temp4');
let humid4 = database.ref('humidity/humidity4')
 
temp4.on('value', function(snapshot) {
updateTemp4(snapshot.val());
});
 
humid4.on('value', function(snapshot) {
updateHumid4(snapshot.val());
});
 
function updateTemp4(value) {
let t = document.getElementById('temp4')
if(t != null) {
  t.innerHTML = Math.round(value*10)/10 + ('°C')
}
}
 
function updateHumid4(value) {
let t = document.getElementById('humidity4')
if(t != null) {
  t.innerHTML = Math.round(value*10)/10 + ('%')
}
}

let temp5 = database.ref('temps/temp5');
let humid5 = database.ref('humidity/humidity5')
 
temp5.on('value', function(snapshot) {
updateTemp5(snapshot.val());
});
 
humid5.on('value', function(snapshot) {
updateHumid5(snapshot.val());
});
 
function updateTemp5(value) {
let t = document.getElementById('temp5')
if(t != null) {
  t.innerHTML = Math.round(value*10)/10 + ('°C')
}
}
 
function updateHumid5(value) {
let t = document.getElementById('humidity5')
  if(t != null) {
    t.innerHTML = Math.round(value*10)/10 + ('%')
  }
}

var medelvärde = document.getElementById (medelvärde)
var arr = [1,2,3,4,5]
// console.log(arr.sum() / arr.length)

// GRAF-DELEN-KLASSRUMMET
let myData = [
  ['Year', 'Temperatur']	
]

let todaysTemps = database.ref('temp-time/temp-time1/' + getCurrentDate()).limitToLast(24);

todaysTemps.on('value', function(snapshot) {
  console.log(snapshot.val())
  updateGraf(snapshot.val());
});

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawChart);

function getCurrentDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  return today
}

function updateGraf(value) {
  let x = Object.entries(value)
  myData.push(...x)
  drawChart(myData)
}	

function drawChart(list) {

  var data = google.visualization.arrayToDataTable(list);

    var options = {
      title: 'Temperatur och Luftfuktighet',
      curveType: 'function',
      legend: { position: 'bottom' },
    };
  
    var chart = new google.visualization.LineChart(document.getElementById('container'));
  
    chart.draw(data, options);
  }