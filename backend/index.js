const express = require("express");
const app = express();
const { DBConnection } = require("./database/db");

const userRoute = require("./routes/user.route.js");
const problemRoute = require("./routes/problem.route.js");
const compileRoute = require('./routes/compile.route.js');
const cors = require("cors");

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
app.use("/", userRoute);
app.use("/problems", problemRoute);
app.use('/', compileRoute);





DBConnection();



app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
