import mongoose from "mongoose";
//create userSchema
const userSchema = mongoose.Schema({
  userId: { type: String, required: true },
  userPassword: { type: String, required: true },

  profile: {
    name: { type: String, required: false },
    gender: { type: String, required: false },
    email: { type: String, required: false },
    city: { type: String, required: false },
    pinCode: { type: Number, required: false },
    addressone: { type: String, required: false},
    addresstwo: { type: String, required: false },
    mobile: { type: Number, required: false },
    state: { type: String, required: false },
    district: { type: String, required: false },
    country: { type: String, required: false },
  },

  loginTime: { type: Date, default: Date.now },
  registeredDate: { type: Date, default: Date.now },
});

//create userModel

export default mongoose.model("userModel", userSchema);
