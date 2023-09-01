import userModel from "../Models/user.js";
import mongoose from "mongoose";
export const setprofile = async (req, res) => {
  try {
    console.log("User Id :", req.body?.newAuth?.result?._id);
    const userDatabaseId = req.body?.newAuth?.result?._id;
    const userId = req.body?.newAuth?.result?.userId;
    const user = await userModel.findOne({ userId });
    if (!user) {
      return res.status(400).json({ message: "User Not Exists" });
    }
    if (!mongoose.Types.ObjectId.isValid(userDatabaseId)) {
      return res.status(400).json({ message: "UserId not Valid" });
    }
    const newProfile = req.body?.user;
    console.log(newProfile)
    const updatedUser = await userModel.findByIdAndUpdate(userDatabaseId, {
      profile: {
        name: newProfile.name || null,
        gender: newProfile.gender || null,
        email: newProfile.email || null,
        city: newProfile.city || null,
        pinCode: newProfile.pinCode || null,
        addressone: newProfile.addressLine1 || null,
        addresstwo: newProfile.addressLine2 || null,
        mobile: newProfile.mobile || null,
        state: newProfile.state || null,
        district: newProfile.district || null,
        country: newProfile.country || null,
       
      },
    });
    res.status(200).json({ message: "User Profile Updated." });
    console.log(updatedUser);
  } catch (error) {
    console.log(error);
  }
};
export const getUpdatedProfile = async (req, res) => {
  try {
    const _id = req.body?._id;
    const updatedProfile = await userModel.findOne({ _id });
    if (!updatedProfile) {
      return res.status(400).json({ message: "User Not Exists" });
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "UserId not Valid" });
    }
    if (!updatedProfile) {
      return res.status(400).json({ message: "No Profile Found" });
    }
    res.status(200).json({ updatedProfile: updatedProfile });
    return updatedProfile;
  } catch (error) {
    console.log(error);
  }
};
