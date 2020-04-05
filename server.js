const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "dreyWesson",
    password: "",
    database: "face-app",
  },
});
db.select("*")
  .from("users")
  .then((data) => {
    console.log(data);
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.send(database.users));

// currying example linked with signin.js
app.post("/signin", signin.handleSignin(db, bcrypt));

app.post("/register", (req, res) =>
  register.handleRegister(req, res, db, bcrypt)
);

app.get("/profile/:id", (req, res) => profile.handleProfile(req, res, db));

app.put("/image", (req, res) => image.handleImage(req, res, db));
app.post("/imageurl", (req, res) => image.handleApiCall(req, res));

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`listening now on ${port}`));
