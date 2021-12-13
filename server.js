const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");

//Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins
app.use(cors());

//received files are stored in disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

//this multer middleware is used for getting formdata which is multipart/formdata.
const Data = multer({ storage: storage });

//response send with form page
app.get("/form", (req, res) => {
  res.status(200);
  res.sendFile(__dirname + "/pages/formPage.html");
});

//response send with file page
app.get("/file", (req, res) => {
  res.status(200);
  res.sendFile(__dirname + "/pages/filePage.html");
});

//request receive with form data
app.post("/formdata", Data.none(), (req, res) => {
  res.status(200);
  const data = req.body;
  console.log(data);
  //you can these data to store database
  res.end();
});

//request receive with files
app.post("/files", Data.single("fileName"), (req, res) => {
  res.status(200);
  console.log("Your file has uploaded.");
  res.end();
});

//using port 3001
app.listen(3001, () => {
  console.log("Server is running on port 3001");
  console.log("Form Page: " + "http://localhost:3001/form");
  console.log("File Page: " + "http://localhost:3001/file");
});
