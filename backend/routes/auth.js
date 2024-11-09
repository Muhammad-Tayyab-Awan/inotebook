/* eslint-disable no-undef */
import express from "express";
import Users from "../models/Users.js"; // * importing user model
const router = express.Router();
import expressValidator from "express-validator";
import bcrypt from "bcryptjs";
const { body, validationResult } = expressValidator;
import JWT from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET; // * defined secret for jsonwebtoken
import getUser from "../middleware/getUser.js"; // * imported getUser Middleware
// * route for registering a new user
router.post(
  "/signup",
  [
    body("name", "Name must contain at least 8 chars").isLength({ min: 8 }), // * validating name by setting the min-length of name to 8 chars
    body("email", "Please enter correct email").isEmail(), // * validating email by defining that email should be correct email
    body(
      "password",
      "Password must contain at Least 3 numbers, 3 lowercase chars, 1 symbol and 1 uppercase char"
    ).isStrongPassword({
      minLength: 8,
      minNumbers: 3,
      minLowercase: 3,
      minSymbols: 1,
      minUppercase: 1
    }) // * validating strong password by defining that password must be min-length of 8 and must contain 3 numbers, 3 lowercase letters, 1 symbol, 1 uppercase letter
  ],
  async (req, res) => {
    try {
      // * wrapped into trycatch() block to handle errors
      const result = validationResult(req); // * validating request using express-validator
      if (result.isEmpty()) {
        // * in case when request is validated successfully
        let user = await Users.findOne({ email: req.body.email }); // * searching user in Database by the email taken from the request.body in order to verify that either that email already exist or not
        if (!user) {
          // * in case when user with the email provided by the client not exists in the Database
          let salt = await bcrypt.genSalt(10); // * generating salt
          let hashedPassword = await bcrypt.hash(req.body.password, salt); // * hashing the password along with salt
          user = await Users.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
          }); // * creating a new user
          let token = JWT.sign({ id: user.id }, JWT_SECRET); // * creating token from the id of the new user
          res.status(200).json({ success: true, authToken: token }); // * sending response with success message and auth-token
        } else {
          // * in case when user with the email provided by the client exists in the Database
          res.status(400).json({
            success: false,
            error: "User with this email already exists"
          }); // ! sending error
        }
      } else {
        // * in case when request is not validated successfully
        return res.status(400).json({ success: false, errors: result.errors }); // ! sending error(s)
      }
    } catch (error) {
      // * in case when error occurs on server side
      res.status(500).json({
        success: false,
        error: "Error Occurred on Server Side",
        message: error.message
      }); // ! sending error
    }
  }
);
// * route to login existing user
router.post(
  "/login",
  [
    body("email", "Please Enter Correct Email").isEmail(), // * validating email by defining that email should be correct email
    body("password", "Please Enter Correct Password").exists() // * validating that password must exist in request.body
  ],
  async (req, res) => {
    try {
      // * wrapped into trycatch() block to handle errors
      const result = validationResult(req); // * validating request using express-validator
      if (result.isEmpty()) {
        // * in case when request is validated successfully
        let { email, password } = req.body; // * destructuring email, password from req.body
        let user = await Users.findOne({ email: email }); // * searching user in Database by the email taken from the request.body in order to verify that either user exist or not
        if (!user) {
          // * in case when user not exist in Database
          res.status(400).json({
            success: false,
            error: "Invalid credentials! Please Enter Correct credentials"
          }); // ! sending error
        } else {
          // * in case when user exist in Database
          const comparePassword = await bcrypt.compare(password, user.password); // * comparing password of the user with the email taken from the request.body present in the database with the password provided in request.body
          if (comparePassword) {
            // * in case when password compared successfully
            let token = JWT.sign({ id: user.id }, JWT_SECRET); // * generating token using user id
            res.status(200).json({ success: true, authToken: token }); // * sending response with auth-token
          } else {
            // * in case when password not compared successfully
            res.status(400).json({
              success: false,
              error: "Invalid credentials! Please Enter Correct credentials"
            }); // ! sending error
          }
        }
      } else {
        // * in case when request is not validated successfully
        return res.status(400).json({ success: false, errors: result.errors }); // ! sending error(s)
      }
    } catch (error) {
      // * in case when error occurs on server side
      res.status(500).json({
        success: false,
        error: "Error Occurred on Server Side",
        message: error.message
      }); // ! sending error
    }
  }
);
// * route to get the data of user that is logged in
router.post("/getuser", getUser, async (req, res) => {
  try {
    // * wrapped into trycatch() block to handle errors
    const userId = req.user.id; // * getting user id from the user object created in getUser() middleware
    const user = await Users.findOne({ _id: userId }).select("-password"); // * fetching data ( excluding password ) of the user from the Database
    res.status(200).json({ success: true, user }); // * sending response with the user data fetched from the Database
  } catch (error) {
    // * in case when error occurs on server side
    res.status(500).json({
      success: false,
      error: "Error Occurred on Server Side",
      message: error.message
    }); // ! sending error
  }
});
// * route to update information of existing user
router.put(
  "/update",
  [
    body("name", "Name must contain at least 8 chars").isLength({ min: 8 }), // * validating name by setting the min-length of name to 8 chars
    body("email", "Please enter correct email").isEmail() // * validating email by defining that email should be correct email
  ],
  getUser,
  async (req, res) => {
    try {
      // * wrapped into trycatch() block to handle errors
      const result = validationResult(req); // * validating request using express-validator
      if (result.isEmpty()) {
        // * in case when request is validated successfully
        const userId = req.user.id; // * getting user id from the user object created in getUser() middleware
        const user = await Users.findOne({ _id: userId }); // * fetching data of the user from the Database
        let userByEmail = await Users.findOne({ email: req.body.email }); // * searching in Database that the user with the email found in request.body present or not
        if (userByEmail && userByEmail._id.toString() === user._id.toString()) {
          // * in case when user is present in the data base and the id of the user by the email found in request.body and the id of user is same
          const updatedUser = {
            _id: user._id,
            ...req.body,
            date: user.date,
            password: user.password
          }; // * destructuring req.body and creating new data of the user
          await Users.findByIdAndUpdate(userId, updatedUser); // * updating the user information
          res
            .status(200)
            .json({ success: true, message: "User Data Updated Successfully!" }); // * sending response
        } else if (userByEmail) {
          // * in case when other user with the email found in request.body already exists
          res.status(400).json({
            success: false,
            error: "User with this email already exists"
          }); // ! sending error
        } else {
          // * in case when user with the email found in the request.body not exists in the Database
          const updatedUser = {
            _id: user._id,
            ...req.body,
            date: user.date,
            password: user.password
          }; // * destructuring req.body and creating new data of the user
          await Users.findByIdAndUpdate(userId, updatedUser); // * updating the user information
          res
            .status(200)
            .json({ success: true, message: "User Data Updated Successfully!" }); // * sending response
        }
      } else {
        // * in case when request is not validated successfully
        return res.status(400).json({ success: false, error: result.errors }); // ! sending error(s)
      }
    } catch (error) {
      // * in case when error occurs on server side
      res.status(500).json({
        success: false,
        error: "Error Occurred on Server Side",
        message: error.message
      }); // ! sending error
    }
  }
);
export default router; // * exporting router
