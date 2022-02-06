import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import listingRoutes from "./routes/listingRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { isSignedIn } from "./controllers/User.js"
const app = express();
const port = 5000;
dotenv.config()

app.use(express.json())

mongoose.connect(process.env.DATABASE)
  .then(() => console.log("DB CONNECTED"));

app.use('/listings', isSignedIn, listingRoutes);
app.use('/', userRoutes)

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
