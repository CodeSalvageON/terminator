var next_slide = 1;
var emp_charge_up = 0;
var rifle_ammo = 5;

var hallway_image = "https://terminator.codesalvageon.repl.co/images/hallway1.png";
var t600_logic = ["yes", "no"];

var hallway_looking = true;

var game_ended = false;

function t600fadeOut () {
  $("#t600-jumpscare").fadeOut();
}

function menushow () {
  $("#main-menu").show();
}

function t600jumpscare () {
  $("#game-main-hallway").hide();
  document.getElementById("ambience").pause();
  $("#t600-jumpscare").fadeIn();
  document.getElementById("jumpscare").play();
  game_ended = true;
  $("#game-start").click();
  setTimeout(t600fadeOut, 1000);
  setTimeout(menushow, 2000);
  game_ended = false;
  hallway_image = "https://terminator.codesalvageon.repl.co/images/hallway1.png";
  emp_charge_up = 0;
  rifle_ammo = 10;
}

function t600show () {
  var t600_choice = t600_logic[Math.floor(Math.random() * t600_logic.length)];

  if (t600_choice === "yes") {
    document.getElementById("stomping").play();

    hallway_image = "https://terminator.codesalvageon.repl.co/images/hallway2.png";

    setTimeout(t600jumpscare, 5000);
  }

  else {
    hallway_image = "https://terminator.codesalvageon.repl.co/images/hallway1.png";
  }

  if (hallway_looking === true) {
    document.getElementById("hallway").src = hallway_image;
  }
}

$(".index-button").click(function () {
  document.getElementById("gunshot").play();
  document.querySelector("body").style.backgroundColor = "white";

  $("#credentials").hide();
});

$("#create-account").click(function () {
  setTimeout(switchToRegister, 400);
});

$("#login-account").click(function () {
  setTimeout(switchToLogin, 400);
});

$("#register-back").click(function () {
  $("#register").hide();
  $("#credentials").show();
});

$("#login-back").click(function () {
  $("#login").hide();
  $("#credentials").show();
});

$("#view-techcom").click(function () {
  $("#main-menu").hide();
  $("#techcom-progress").show();
});

$("#techcom-back").click(function () {
  $("#main-menu").show();
  $("#techcom-progress").hide();
});

$("#play").click(function () {
  $("#main-menu").hide();
  $("#game-load-screen").show();
});

$("#game-start").click(function () {
  var x = setInterval(t600show, 6000);

  if (game_ended === false) {
    $("#game-load-screen").hide();
    $("#game-main-hallway").show();

    document.getElementById("ambience").play();
  }

  else {
    for (var i = 1; i < 99999; i++)
      window.clearInterval(i);
  }
});

$("#shoot-rifle").click(function () {

  if (rifle_ammo < 1) {
    return false;
  }

  document.getElementById("shotgun").play();

  hallway_image = "https://terminator.codesalvageon.repl.co/images/hallway3.png";

  document.getElementById("hallway").src = hallway_image;

  hallway_image = "https://terminator.codesalvageon.repl.co/images/hallway1.png";

  function setToNormal () {
    document.getElementById("hallway").src = hallway_image;
  }

  setTimeout(setToNormal, 500);

  rifle_ammo = rifle_ammo - 1;

  console.log(rifle_ammo);

  document.getElementById("rifle-ammo-count").innerText = "Rifle AMMO: " + rifle_ammo;

  for (var i = 1; i < 99999; i++)
    window.clearInterval(i);
  
  setInterval(t600show, 6000);
});

$("#charge-up").click(function () {
  $("#shoot-rifle").hide();
  
  hallway_looking = false;
  emp_charge_up = emp_charge_up + 0.5;

  $("#turn-around").hide();
  $("#return-main-hallway").show();

  document.getElementById("hallway").src = "https://terminator.codesalvageon.repl.co/images/console.gif";
  document.getElementById("emp-charge-count").innerText = 'EMP CHARGED: ' + emp_charge_up + '%';

  if (emp_charge_up > 99) {
    for (var i = 1; i < 99999; i++)
      window.clearInterval(i);

    document.getElementById("ambience").pause();
    $("#game-main-hallway").hide();
    hallway_image = "https://terminator.codesalvageon.repl.co/images/hallway1.png";
    emp_charge_up = 0;
    rifle_ammo = 10;
    menushow();

    var score_data = {
      branch : selector
    }

    fetch("https://terminator.codesalvageon.repl.co/scorecount", {
      method : "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(score_data)
    })
    .then(response => response.text())
    .then(data => {
      document.getElementById("terminators-destroyed").innerText = "Terminators Destroyed: " + data;
    })
    .catch((error) => {
      console.log(error);
    });
  }
});

$("#return-main-hallway").click(function () {
  $("#shoot-rifle").show();
  $("#turn-around").show();
  $("#return-main-hallway").hide();

  hallway_looking = true;

  document.getElementById("hallway").src = hallway_image;
});

$("#rogue-gallery").click(function () {
  $("#main-menu").hide();
  $("#rogues-gallery").show();
});

$("#rogues-back").click(function () {
  next_slide = 2;
  $("#rogues-next").click();

  $("#main-menu").show();
  $("#rogues-gallery").hide();
});

$("#rogues-next").click(function () {
  next_slide = next_slide + 1;

  if (next_slide === 2) {
    document.getElementById("terminator-name").innerText = 'Terminator T-70T';
    document.getElementById("terminator-switch").innerHTML = '<img src="https://terminator.codesalvageon.repl.co/images/t75.png" />';
  }
  else {
    next_slide = 1;

    document.getElementById("terminator-name").innerText = 'Terminator T-600';
    document.getElementById("terminator-switch").innerHTML = '<img src="https://terminator.codesalvageon.repl.co/images/t600.png" />';
  }
});

$("#logout").click(function () {
  location = '';
});

$("#discord").click(function () {
  window.open("https://discord.gg/A4X5D8Y");
});