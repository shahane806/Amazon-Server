import RecentOrders from "../Models/recentOrder.js";
import mongoose from "mongoose";
export const fetchRecentOrders = async (req, res) => {
  try {
    const _id = req.body?.userId;
    const recentOrders = await RecentOrders.findOne({ _id });
    if (recentOrders?.profile?.recentOrders === [{}]) {
      return res.status(400).json({ message: "No Orders yet." });
    }
    res.status(200).json({ RecentOrders: recentOrders?.profile?.recentOrders });
    return recentOrders?.profile?.recentOrders;
  } catch (error) {
    console.log(error);
  }
};
export const updateRecentOrders = async (req, res) => {
  try {
    console.log(req)
  } catch (error) {
    console.log(error);
  }
};
