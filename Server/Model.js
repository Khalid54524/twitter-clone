import mongoose from "mongoose";

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id; // ta bort _id när vi skickar (detta ersätter med id istället)
    delete converted.__v; // ta bort __v när vi skickar
  },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  about: String,
  employment: String,
  hometown: String,
  website: String,
  registrationDate: { type: Date, default: Date.now },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});