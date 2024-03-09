//create express server
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
//create express app
import { login, signup, forgetPassword } from "./Controllers/auth.js";
import { purchaseItems } from "./Controllers/purchaseItems.js";
import { getUpdatedProfile, setprofile } from "./Controllers/profile.js";
import verifyToken from "./middleware/verify.js";
import { updateRecentOrders,fetchRecentOrders } from "./Controllers/recentOrders.js";
const app = express();
const env = dotenv.config();


//apply middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json("Amazon Clone Api");
});

app.post("/auth/login", login);
app.post("/auth/signup", signup);
app.post("/auth/forgetPassword", forgetPassword);


app.post("/checkout/payment",verifyToken, purchaseItems);
app.post("/user/profile",verifyToken,setprofile);
app.post("/user/getUpdatedProfile",verifyToken,getUpdatedProfile);
app.post("/Orders/UpdateRecentOrders",verifyToken,updateRecentOrders);
app.post("/Orders/FetchRecentOrders",verifyToken,fetchRecentOrders);


const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;


//connection with mongoDB with mongoose
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log("SERVER RUNNING ON PORT", PORT);
    })
  )
  .catch((error) => {
    console.log(error);
  });
