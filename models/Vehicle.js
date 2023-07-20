const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    vehicleType: {
      type: String,
      enum: ["Two Wheeler", "Four Wheeler"],
    },
    vehicleNumber: {
      type: String,
    },
  },
  { timestamps: true }
);
vehicleSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

vehicleSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("Vehicle", vehicleSchema);
