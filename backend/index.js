const express = require("express");
const app = express();
const { DBConnection } = require("./database/db");

const userRoute = require("./routes/user.route.js");
const problemRoute = require("./routes/problem.route.js");
const compileRoute = require('./routes/compile.route.js');
const submissionRoute = require('./routes/submission.route.js');
const cookieParser=require('cookie-parser')
const cors = require("cors");
const { rateLimit } = require("express-rate-limit")

require('dotenv').config();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 10000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)
//routers
app.use("*",(req,res,next)=>{
  const origin = req.headers.origin;
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Credentials", "true");
  next()
})
//middlewares
app.use(cors({
  origin:["http://localhost:5173","http://127.0.0.1:5173","https://code-zen-project.vercel.app/",'https://www.codingmindset.tech']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

app.use("/", userRoute);
app.use("/problems", problemRoute);
app.use('/', compileRoute);
app.use('/',submissionRoute);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});




DBConnection();



app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
