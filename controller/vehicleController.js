const Vehicle = require("../models/Vehicle");

exports.create = async (req, res) => {
  try {
    const { userId, vehicleType, vehicleNumber } = req.body;
    const response = await new Vehicle({
      userId,
      vehicleType,
      vehicleNumber,
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
    const response = await Vehicle.findOne({ _id: id });
    return res.status(200).json({ response: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error, msg: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Vehicle.findByIdAndDelete(id);
    return res.status(200).send("Vehicle  Deleted Successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error, msg: error.message });
  }
};
