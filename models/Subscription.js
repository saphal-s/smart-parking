const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
    },
    weeklyPackageAmount: {
      type: Number,
    },
    monthlyPackageAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);
subscriptionSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

subscriptionSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("Subscription", subscriptionSchema);
