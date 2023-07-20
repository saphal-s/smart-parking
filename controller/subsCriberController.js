const Subscription = require("../models/Subscription");

exports.create = async (req, res) => {
  try {
    const { userid, weeklyPackageAmount, monthlyPackageAmount } = req.body;
    const response = await new Subscription({
      userid,
      weeklyPackageAmount,
      monthlyPackageAmount,
    }).save();
    res
      .status(200)
      .json({ msg: "Subscription  created succesfully", response });
  } catch (error) {
    console.log(error);
    res.status(400).send("Subscription  create faild!");
  }
};

exports.list = async (req, res) => {
  try {
    const response = await Subscription.find().sort({ updatedAt: -1 });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: error, msg: error.message });
  }
};

exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Subscription.findOne({ _id: id });
    return res.status(200).json({ response: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error, msg: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Subscription.findByIdAndDelete(id);
    return res.status(200).send("Subscription  Deleted Successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error, msg: error.message });
  }
};
