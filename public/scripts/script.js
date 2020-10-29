var i = 0;
var id = 'text1';
var txt = `
Terminator: Explorer
Cyberdyne Systems
Lane Change: RIGHT
Ego Speed: 10.05 MPH
Booting...
`;
var speed = 50;

$("#credentials").hide();
$("#register").hide();
$("#login").hide();
$("#main-menu").hide();
$("#techcom-progress").hide();
$("#rogues-gallery").hide();
$("#game-load-screen").hide();
$("#game-main-hallway").hide();
$("#return-main-hallway").hide();
$("#t600-jumpscare").hide();

function textFlicker () {
  var f = document.getElementById('flicker1');
}

function changeToRed () {

  document.getElementById("text1").innerHTML = `

CREDENTIALS: `;
  document.getElementById("text1").style.display = "block";

  $("#text1").hide();
  $("#credentials").show();
}

function typeWriter () {
  if (i < txt.length) {
    document.getElementById(id).innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
  if (i >= txt.length) {
    changeToRed();
  }
}

function switchToRegister () {
  document.querySelector("body").style.backgroundColor = "black";
  $("#register").show();
}

function switchToLogin () {
  document.querySelector("body").style.backgroundColor = "black";
  $("#login").show();
}

typeWriter();