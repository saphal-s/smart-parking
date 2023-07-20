const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    twoWheeler: {
      type: Number,
    },
    fourWheeler: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    twoWheelerBookedSpace: {
      type: Number,
      default: 0,
    },
    fourWheelerBookedSpace: {
      type: Number,
      default: 0,
    },
    twoWheelerRate: {
      type: Number,
    },
    fourWheelerRate: {
      type: Number,
    },
  },
  { timestamps: true }
);
parkingSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

parkingSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("Parking", parkingSchema);
