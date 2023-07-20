const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    bookingCount: {
      type: Number,
      default: 0,
    },
    rewardPoint: {
      type: Number,
      default: 0,
    },
    packageType: {
      type: String,
      default: "Normal",
      enum: ["Normal", "Weekly", "Monthly"],
    },
    image: {
      type: String,
    },
    userType: {
      type: String,
      default: "user",
      enum: ["user", "owner", "admin"],
    },
    freez: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("User", userSchema);
