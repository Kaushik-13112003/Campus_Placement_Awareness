const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//db & routes
require("./db/db");
app.use(require("./routes/userRoutes"));
app.use(require("./routes/companyRoutes"));
app.use("/uploads", express.static(__dirname + "/uploads"));

app.listen(port, () => {
  console.log("App is listing on PORT : ", colors.rainbow(port));
});
