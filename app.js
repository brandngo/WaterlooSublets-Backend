import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { router } from "./routes.js"
const app = express();
const port = 5000;
dotenv.config()

app.use(express.json())

mongoose.connect(process.env.DATABASE)
  .then(() => console.log("DB CONNECTED"));

app.use('/', router);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
