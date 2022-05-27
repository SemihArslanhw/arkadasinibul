const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");


const app = express();
app.use(cors())
dotenv.config();
mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
  );

  app.use("/images",express.static(path.join(__dirname,"/images")))

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    }, filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
})

const upload = multer({storage: storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded!");
})


app.use(express.json());
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);



const PORT = 8080;

app.listen(PORT ,()=>{
    console.log("backend server is running");
})
