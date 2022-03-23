const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
     
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      max: 50,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    lat:{
      required: true,
      type: Number,
    },
    lng:{
      required: true,
      type: Number,
    },
    profilePicture: {
        type: String,
        default: "",
      },
    isProfileSelfAdded: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);