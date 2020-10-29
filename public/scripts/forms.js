var riff;
var selector;
var selector_value;

$("#register-form").submit(function () {
  event.preventDefault();

  var register_data = {
    codename : document.getElementById("codename").value,
    passcode : document.getElementById("passcode").value,
    techcom_unit : document.getElementById("techcom_unit").value
  }

  fetch("https://terminator.codesalvageon.repl.co/register", {
    method : "POST",
    headers : {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify(register_data)
  })
  .then(response => response.text())
  .then(data => {
    riff = data;

    if (riff.includes("SET")) {
      const techcom_selector = riff.replace("SET ", "");

      if (techcom_selector.includes("la")) {
        selector = "la";
      }

      else if (techcom_selector.includes("sf")) {
        selector = "sf";
      }

      else if (techcom_selector.includes("ops")) {
        selector = "ops";
      }

      else {
        selector = "ops";
      }

      $("#login").hide();
      $("#register").hide();
      $("#main-menu").show();

      setTechCom();
    }

    else if (riff.includes("FAILED")) {
      document.getElementById("register-error").innerText = 'Account Creation Failed. Request over size limit.';
    }

    else if (riff.includes("EXISTS")) {
      document.getElementById("register-error").innerText = 'Account Creation Failed. That account already exists!';
    }

    else {
      document.getElementById("register-error").innerText = 'Account Creation Failed. Unknown Error.';
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});

$("#login-form").submit(function () {
  event.preventDefault();

  var login_data = {
    codename : document.getElementById("login_codename").value,
    passcode : document.getElementById("login_password").value
  }

  fetch("https://terminator.codesalvageon.repl.co/login", {
    method : "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(login_data)
  })
  .then(response => response.text())
  .then(data => {
    riff = data;

    if (riff.includes("SET")) {
      const techcom_selector = riff.replace("SET ", "");

      selector = techcom_selector;

      $("#login").hide();
      $("#register").hide();
      $("#main-menu").show();

      setTechCom();
    }

    else if (riff.includes("FAILED")) {
      document.getElementById("login-error").innerText = 'Login Failed. That account does not exist!';
    }

    else if (riff.includes("PWD")) {
      document.getElementById("login-error").innerText = 'Login Failed. Incorrect Passcode!';
    }

    else {
      document.getElementById("login-error").innerText = 'Login Failed. Unknown Error.';
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});

function checkTechCom (value) {
  var check_data = {
    branch : value
  }

  fetch("https://terminator.codesalvageon.repl.co/check", {
    method : "POST",
    headers : {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(check_data)
  })
  .then(response => response.text())
  .then(data => {
    document.getElementById("terminators-destroyed").innerText = document.getElementById("terminators-destroyed").innerText + data;
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function changeValue (value) {
  selector_value = value;
}

function setTechCom () {
  if (selector === "la") {
    checkTechCom("la");
    document.getElementById("techcom-id").innerText = document.getElementById("techcom-id").innerText + 'TechCom LA';
  }

  else if (selector === "sf") {
    checkTechCom("sf");
    document.getElementById("techcom-id").innerText = document.getElementById("techcom-id").innerText + 'TechCom SF';
  }
  
  else if (selector === "ops") {
    checkTechCom("ops");
    document.getElementById("techcom-id").innerText = document.getElementById("techcom-id").innerText + 'TechCom OPS';
  }

  else {
    window.close();
  }
}