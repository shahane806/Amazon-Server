import mongoose from "mongoose";
const recentOrdersSchema = mongoose.Schema({
    userId: { type: String, required: true },
   
    recentOrders: { type: [Object], required: true },
  
    loginTime: { type: Date, default: Date.now },
    registeredDate: { type: Date, default: Date.now },
  });
  

export default mongoose.model("RecentOrders", recentOrdersSchema);
