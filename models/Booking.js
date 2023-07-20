const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingStatus: {
      type: String,
      default: "Not Processed",
      enum: ["Not Processed", "Processing", "Cancelled", "Completed"],
    },
    isParked: {
      type: String,
      default: "Parking",
      enum: ["Parking", "Completed"],
    },
    reserveSpaceTwoWheeler: {
      type: Number,
      default: 0,
    },
    reserveSpaceFourWheeler: {
      type: Number,
      default: 0,
    },
    time: {
      type: Number,
    },
    vehicleNo: {
      type: String,
    },
    entryTime: {
      type: String,
    },
    outingTime: {
      type: String,
    },
    amount: {
      type: Number,
    },
    user: {
      type: String,
    },
    vehicleType: {
      type: String,
    },
    receivedBy: {
      type: String,
    },
    sourceLat: {
      type: Number,
    },
    sourceLong: {
      type: Number,
    },
    destLat: {
      type: Number,
    },
    destLong: {
      type: Number,
    },
  },
  { timestamps: true }
);

bookingSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

bookingSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Booking", bookingSchema);
