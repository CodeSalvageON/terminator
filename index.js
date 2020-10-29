const fs = require('fs');
const express = require('express');

const firebase = require("firebase");
require("firebase/firestore");

const Database = require("@replit/database");
const db = new Database();

var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  const index = __dirname + '/public/static/index.html';

  res.sendFile(index);
});

app.post("/login", function (req, res) {
  const codename = req.body.codename;
  const passcode = req.body.passcode;

  var unit_set;

  db.get(codename).then(value => {
    if (value === null || value === undefined || value === '') {
      console.log("x");

      res.send("FAILED");
    }
    else {
      db.get(codename).then(value => {
        if (value.includes("/*(la")) {
          const account_password = value.replace("/*(la", "");

          if (passcode === account_password) {
            res.send("SET la");
          }
          
          else {
            res.send("PWD");
          }
        }
        
        else if (value.includes("/*(sf")) {
          const account_password = value.replace("/*(sf", "");

          if (passcode === account_password) {
            res.send("SET sf");
          }

          else {
            res.send("PWD");
          }
        }

        else if (value.includes("/*(ops")) {
          const account_password = value.replace("/*(ops", "");

          if (passcode === account_password) {
            res.send("SET ops");
          }

          else {
            res.send("PWD");
          }
        }

        else {
          console.log("y");

          res.send("FAILED");
        }
      });
    }
  });
});

app.post("/register", function (req, res) {
  const codename = req.body.codename;
  const passcode = req.body.passcode;
  const techcom_unit = req.body.techcom_unit;

  var unit_set;

  db.get(codename).then(value => {
    if (value === null || value === undefined || value === '') {
      const codename_length = codename.length;

      if (codename_length > 25) {
        res.send("FAILED");
      }

      else {
        const passcode_length = passcode.length;

        if (passcode_length > 25) {
          res.send("FAILED");
        }

        else {
          if (techcom_unit === "la") {
            unit_set = "/*(la";
          }

          else if (techcom_unit === "sf") {
            unit_set = "/*(la";
          }

          else if (techcom_unit === "ops") {
            unit_set = "/*(ops";
          }

          else {
            unit_set = "/*(ops";
          }

          db.set(codename, passcode + unit_set).then(() => {
            res.send("SET " + techcom_unit);
          });
        }
      }
    }

    else {
      res.send("EXISTS");
    }
  });
});

app.post("/check", function (req, res) {
  const branch = req.body.branch;

  console.log(branch);

  if (branch === "la") {
    db.get("la").then(value => {
      res.send(value);
    });
  }
  
  else if (branch === "sf") {
    db.get("sf").then(value => {
      res.send(value);
    });
  }

  else if (branch === "ops") {
    db.get("ops").then(value => {
      res.send(value);
    });
  }
  
  else {
    db.get("ops").then(value => {
      res.send(value);
    });
  }
});

app.post("/scorecount", function (req, res) {
  const branch = req.body.branch;

  var final_branch;

  if (branch === "la") {
    final_branch = "la";
  }

  else if (branch === "sf") {
    final_branch = "sf";
  }

  else if (branch === "ops") {
    final_branch = "ops";
  }

  else {
    final_branch = "ops";
  }

  db.get(final_branch).then(value => {
    var lol = parseInt(value) + parseInt("1")

    db.set(final_branch, lol.toString()).then(() => {
      db.get(final_branch).then(value => {
        res.send(value);
      });
    });
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);

  db.get("la").then(value => {
    if (value === null || value === undefined || value === '') {
      db.set("la", "0").then(() => {
        console.log("FIXED TechCom LA");
      });
    }
    else {
      console.log("No FIX needed for TechCom LA");
    }
  });

  db.get("sf").then(value => {
    if (value === null || value === undefined || value === '') {
      db.set("sf", "0").then(() => {
        console.log("FIXED TechCom SF");
      });
    }
    else {
      console.log("No FIX needed for TechCom SF");
    }
  });

  db.get("ops").then(value => {
    if (value === null || value === undefined || value === '') {
      db.set("ops", "0").then(() => {
        console.log("FIXED TechCom OPS");
      });
    }
    else {
      console.log("No FIX needed for TechCom OPS");
    }
  });
});