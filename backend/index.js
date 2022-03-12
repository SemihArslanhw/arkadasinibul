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
app.use(express.json());
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log("backend server is runing")
})
