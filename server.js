const path = require("path");

const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const multer = require("multer");

const app = express();

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

const PORT = 3000;

const MONGODB_URL =
  "mongodb+srv://Yaswanth:Yash1234@cluster0.hq3suhg.mongodb.net/podcastDb?retryWrites=true&w=majority&appName=Cluster0";

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/Files");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

app.use(cors());
app.use(bodyParser.json());

app.use(
  multer({
    storage: fileStorage,
    limits: {
      fileSize: 50 * 1024 * 1024, // 50 MB IN BYTES
    },
  }).single("file")
);

app.use("/files", express.static(path.join(__dirname, "files")));

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("connected");
    app.listen(PORT, () => {
      console.log("server is listening to port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
