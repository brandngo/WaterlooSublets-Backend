import Users from "../models/User.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import expressjwt from "express-jwt"
import bcrypt from "bcrypt"
import "cookie-parser"

dotenv.config()

export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) { // should prob be error checked in the frontend?
      return res.status(400).json({
        error: "Missing information."
      })
    }
/*
    Users.findOne({ email })
      .then((data) => {
        if (data) {
          return res.status(400).json({ // this return will only breakout of .then statement
            error: "User exists."
          })
        }
      })
*/
    const doc = await Users.findOne({ email }).exec()

    if (doc !== null) {
      return res.status(400).json({
        error: "User exists."
      })
    }
    const user = new Users({
      email,
      password: await bcrypt.hash(password, 10)
    })

    const userSave = await user.save();
    return res.status(200).json(userSave)
  } catch (err) {
    return res.status(400).json({
      error: "Email and password required."
    })
  }
}

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({
        error: "Missing information."
      })
    }

    Users.findOne({ email })  // replace this .then chain with var to avoid faulty error handling
      .then((data) => {
        if (!data) {
          return res.status(401).json({
            error: "Invalid username/password."
          })
        }
        return data
      })
      .then((data) => {
        bcrypt.compare(password, data.password)
          .then((data) => {
            if (data) {
              const token = jwt.sign(
                {
                  id: data._id,
                  email: data.email,
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: 86400,
                }
              )
              return res.status(200).json({
                token
              })
            } else {
              return res.status(401).json({
                error: "Invalid username/password."
              })
            }
          })
      })
      .catch((err) => console.log(err))
  } catch (err) {
    console.log(err)
  }
}

//https://stackoverflow.com/questions/40970329/how-to-handle-errors-with-express-jwt
// handling authentication errors
export const isSignedIn = expressjwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ["HS256"]
})