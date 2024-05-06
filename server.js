const path = require("path");

const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const multer = require("multer");

const app = express();

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/podcast");

const PORT = 3000;

const MONGODB_URL =
  "mongodb+srv://Yaswanth:Yash1234@cluster0.hq3suhg.mongodb.net/podcastDb?retryWrites=true&w=majority&appName=Cluster0";

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Files");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  //ACCEPT ALL TYPES OF FILES
  cb(null, true);
};

app.use(cors());
app.use(bodyParser.json());

app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 50 * 1024 * 1024, // 50 MB IN BYTES
    },
  }).single("file")
);

app.use("/files", express.static(path.join(__dirname, "Files")));

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/home", userRoutes);

//ERROR HANDLE MIDDLEWARE
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({ message: message, err: err });
});

//CONNECTION TO MONGODB
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
