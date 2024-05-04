const express = require("express");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();

const authRoutes = require("./routes/auth");

const PORT = 3000;

const M0NGODB_URL =
  "mongodb+srv://Yaswanth:Yash1234@cluster0.hq3suhg.mongodb.net/podcastDb?retryWrites=true&w=majority&appName=Cluster0";

app.use(bodyParser.json());

app.use("/auth", authRoutes);

mongoose
  .connect(M0NGODB_URL)
  .then(() => {
    console.log("CONNECTED");
    app.listen(PORT, () => {
      console.log("server is listening to port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
