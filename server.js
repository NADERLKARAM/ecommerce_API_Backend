//exp
const { readdirSync } = require("fs");

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./config/db");

//dotenv
dotenv.config({ path: "config.env" });

const app = express();

//db connect
db();

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//routes middlewares
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("hello is running");
});
