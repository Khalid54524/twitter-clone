import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { User, Tweet } from "./Model.js";

const app = express();
app.use(cors()); // Middleware för att tillåta extern kommunikation
app.use(bodyParser.json()); // Middleware för att kunna ta emot JSON-format

// Authentication Middleware
const requireAuth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token || token === "Bearer null") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  req.userId = token.replace("Bearer ", "");
  next();
};

function validatePassword(password) {
  const char = /[!@#$%^&*()_+={}\[\];:'"<>,.?/]/;
  const num = /\d/;
  return password.length >= 8 && char.test(password) && num.test(password);
}
