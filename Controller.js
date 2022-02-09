import express from "express";
const app = express();
import Model from "./Models/Model.js";
import bodyParser from "body-parser";
import { check, validationResult } from "express-validator";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


app.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post("/login", async (req, res) => {
  try {
    let check = await Model.login(req.body);
    if (check === 1) {
      res.status(200).send("Login successful");
    } else if (check === 0) {
      res.status(404).send("User not found");
    } else {
      res.status(401).send("Password incorrect");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post(
  "/signup",
  urlencodedParser,
  [
    check("fname", "Enter only characters")
      .exists()
      .isAlpha()
      .isLength({ min: 3 }),
    check("lname", "Enter only characters")
      .exists()
      .isAlpha()
      .isLength({ min: 3 }),
    check("email", "Email is not valid").isEmail().normalizeEmail(),
    check("phone_no", "Enter valid number").isNumeric().isMobilePhone(),
    check(
      "password",
      "Password must include one lowercase character, one uppercase character, a number, a special character and should be 8 characters long."
    ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).send(errors.array());
    } else {
      try {
        let user = await Model.saveData(req.body);
        if (user.length === 0) {
          res.status(204).send([]);
        } else {
          res.status(201).send(user);
        }
      } catch (error) {
        res.status(500).send(error);
        console.log(error)
      }
    }
  }
);

mongoose.connect(process.env.DB_CONN, () => {
  console.log("Connected to database.");
});

app.listen(3000);
