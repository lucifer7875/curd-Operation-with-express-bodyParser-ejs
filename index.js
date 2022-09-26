const express = require("express");
const bodyParser = require("body-parser");
const { emit } = require("nodemon");
const app = express();

const users = [];

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// templete engine
app.set("view engine", "ejs");

// define routes
app.get("/", (req, res) => {
  res.render("home", {
    data: users,
  });
});

app.post("/", (req, res) => {
  const inputUserUniqueId = req.body.userUniqueId;
  const inputUserName = req.body.userName;
  const inputUserEmail = req.body.userEmail;
  const inputUserAge = req.body.userAge;

  users.push({
    userUniqueId: inputUserUniqueId,
    userName: inputUserName,
    userEmail: inputUserEmail,
    userAge: inputUserAge,
  });

  res.render("home", {
    data: users,
  });
});

// delete
app.post("/delete", (req, res) => {
  let requestUserInputUniqueId = req.body.userUniqueId;
  let j = 0;
  users.forEach((user) => {
    j = j + 1;
    if (user.userUniqueId === requestUserInputUniqueId) {
      users.splice(j - 1, 1);
    }
  });

  res.render("home", {
    data: users,
  });
});

// update
app.post("/update", (req, res) => {
  const inputUserUniqueId = req.body.userUniqueId;
  const inputUserName = req.body.userName;
  const inputUserEmail = req.body.userEmail;
  const inputUserAge = req.body.userAge;

  let j = 0;

  users.forEach((user) => {
    j = j + 1;
    if (user.userUniqueId === inputUserUniqueId) {
      user.userUniqueId = inputUserUniqueId;
      user.userName = inputUserName;
      user.userEmail = inputUserEmail;
      user.userAge = inputUserAge;
    }
  });
  res.render("home", {
    data: users,
  });
});

app.listen(5050, (req, res) => {
  console.log(`app is running on http://localhost:${5050}`);
});
