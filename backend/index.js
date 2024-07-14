const express = require("express");
const app = express();
const { DBConnection } = require("./database/db");

const userRoute = require("./routes/user.route.js");
const problemRoute = require("./routes/problem.route.js");

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
app.use("/", userRoute);
app.use("/problems", problemRoute);

DBConnection();

app.get("/", (req, res) => {
  res.send("Welcome to my world!");
});

app.get("/Home", (req, res) => {
  res.send("Welcome to my Home!");
});

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
