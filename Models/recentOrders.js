import mongoose from "mongoose";
const recentOrderSchemas = mongoose.Schema({
  userId: { type: String, requried: true },
  recentOrders: { type: [], requried: true },
  loginTime: { type: Date, default: Date.now },
  registeredDate: { type: Date, default: Date.now },
});
export default mongoose.model("RecentOrders", recentOrderSchemas);
