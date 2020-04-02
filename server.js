const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());
const database = {
  users: [
    {
      id: "123",
      name: "wesson",
      email: "wesson@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date()
    },
    {
      id: "124",
      name: "drey",
      email: "drey@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: "98",
      hash: "",
      email: "wesson@gmail.com"
    }
  ]
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  // Load hash from your password DB.
  // bcrypt.compare(
  //   "cookies",
  //   "$2a$08$zQHEi2y/3req3zpYbdpk/e.NIdG7Cl5tWPfczcE1BWIEdo523amYy",
  //   function(err, res) {
  //     // res === true
  //     console.log("first guess ", res);
  //   }
  // );
  // bcrypt.compare(
  //   "not_bacon",
  //   "$2a$08$zQHEi2y/3req3zpYbdpk/e.NIdG7Cl5tWPfczcE1BWIEdo523amYy",
  //   function(err, res) {
  //     // res === false
  //     console.log("second guess ", res);
  //   }
  // );
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  )
    res.json(database.users[0]);
  else res.status(404).json("things fall apart");
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  // Auto-gen a salt and hash:
  // bcrypt.hash(password, 8, function(err, hash) {
  //   console.log(hash);
  // });

  database.users.push({
    id: "125",
    name,
    email,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (id === user.id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) res.status(404).json("No match found");
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (id === user.id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) res.status(404).json("No match found");
});

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`listening now on ${port}`));

// Store hash in your password DB.
// var bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("B4c0/\/", salt);

// Load hash from your password DB.
// bcrypt.compareSync("B4c0/\/", hash); // true
// bcrypt.compareSync("not_bacon", hash); // false

// To hash a password:
// var bcrypt = require('bcryptjs');
// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash("B4c0/\/", salt, function(err, hash) {
//         // Store hash in your password DB.
//     });
// });

// Load hash from your password DB.
// bcrypt.compare("B4c0/\/", hash, function(err, res) {
//   // res === true
// });
// bcrypt.compare("not_bacon", hash, function(err, res) {
//   // res === false
// });

// // As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
// bcrypt.compare("B4c0/\/", hash).then((res) => {
//   // res === true
// });
