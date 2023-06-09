const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const blogRoute = require("./routes/blog");
const authRoute = require("./routes/auth");
const app = express();

//connected cloud database
mongoose
   .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: false,
   })
   .then(() => console.log("connected success"))
   .catch((err) => console.error(err));

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//route
app.use("/api", blogRoute);
app.use("/api", authRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`start server in port ${port}`));
