import bcrypt from "bcryptjs";
import userModel from "../Models/user.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { UserId, Password } = req.body;
  try {
    const userExists = await userModel.findOne({ UserId });
    if (userExists) {
      return res.status(500).json({ message: "User Already Exists." });
    }
    const hashPassword = await bcrypt.hash(Password, 12);
    const createNewUser = await userModel.create({
      userId: UserId,
      userPassword: hashPassword,
      profile: {
        name: null,
        gender: null,
        email: null,
        city: null,
        pinCode: null,
        addressone: null,
        addresstwo: null,
        mobile: null,
        state: null,
        district: null,
        country: null,
      },

    });

    const token = jwt.sign(
      {
        id: createNewUser._id,
        userId: createNewUser.userId,
        userPassword: hashPassword,
        profile: {
          name: null,
          gender: null,
          email: null,
          city: null,
          pinCode: null,
          addressone: null,
          addresstwo: null,
          mobile: null,
          state: null,
          district: null,
          country: null,
      
        },
      
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      result: createNewUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  const { UserId, Password } = req.body;
  const userId = UserId;
  try {
    const userExists = await userModel.findOne({ userId });
    if (!userExists) {
      return res.status(500).json({ message: "User Not Exists." });
    }
    const passwordCheck = await bcrypt.compare(
      Password,
      userExists.userPassword
    );
    if (!passwordCheck) {
      return res.status(500).json({ message: "Invalid User Credentials." });
    }

    const token = jwt.sign(
      {
        id: userExists._id,
        userId: userExists.userId,
        userPassword: userExists.userPassword,
        profile: {
          name: userExists.profile.name,
          gender: userExists.profile.gender,
          email: userExists.profile.email,
          city: userExists.profile.city,
          pinCode: userExists.profile.pinCode,
          addressone: userExists.profile.addressone,
          addresstwo: userExists.profile.addresstwo,
          mobile: userExists.profile.mobile,
          state: userExists.profile.state,
          district: userExists.profile.district,
          country: userExists.profile.country,
          
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      result: userExists,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};
export const forgetPassword = async (req, res) => {};
