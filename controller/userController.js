const User = require("../models/User");
const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
require("dotenv").config();

const createToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      isAdmin: user.isAdmin,
    },
    process.env.SECRET,
    {
      expiresIn: "2d",
    }
  );
};

module.exports.regiserValidations = [
  body("name").not().isEmpty().withMessage("Name is reqired"),
  body("email").not().isEmpty().withMessage("Email is required"),
  body("phone").not().isEmpty().withMessage("Phone number is required"),
  body("password").not().isEmpty().withMessage("Password number is required"),
  body("phone").isLength({ min: 10 }).withMessage("Phone number is not valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 character long"),
];
module.exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password, phone } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email is already exit" }] });
    }
    //hash passowrd
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    try {
      const user = await User.create({
        name,
        email,
        phone,
        password: hash,
      });
      const token = createToken(user);
      return res
        .status(200)
        .json({ msg: "Your account has been created", token });
    } catch (error) {
      return res.status(500).json({ errors: error });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

module.exports.loginValidations = [
  body("email").not().isEmpty().withMessage("Email is required"),
  body("password").not().isEmpty().withMessage("Password is required"),
];

module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        const token = createToken(user);
        return res.json({ msg: "Successfully login", token });
      } else {
        return res
          .status(401)
          .json({ errors: [{ msg: "Passowrd is incorrect" }] });
      }
    } else {
      return res
        .status(404)
        .json({ errors: [{ msg: "User does not exit with that email" }] });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

exports.list = async (req, res) => {
  try {
    const response = await User.find()
      .sort({ updatedAt: -1 })
      .select("-passwordHash");
    return res.status(200).json({ response: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: error, msg: error.message });
  }
};

exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await User.findOne({ _id: id }).select("-passwordHash");
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error, msg: error.message });
  }
};

exports.updateProfileImage = async (req, res) => {
  try {
    const updated = await User.findOne({
      _id: req.params.id,
    });
    if (req.file) {
      updated.image = req.file.path;
    }
    updated.save();
    // res.json(updated);
    res.status(200).json({ msg: "Your profile has been updated" });
  } catch (err) {
    console.log("Image update error", err);
    return res.status(400).send({ msg: "Image update failed" });
  }
};

exports.booking = async (req, res) => {
  const {
    reserveSpace,
    entryTime,
    outingTime,
    amount,
    user,
    reserveSpaceTwoWheeler,
    reserveSpaceFourWheeler,
    time,
    vehicleNo,
    vehicleType,
    receivedBy,
    sourceLat,
    sourceLong,
    destLat,
    destLong,
  } = req.body;
  console.log(req.body);
  try {
    const booking = await Booking.create({
      reserveSpace,
      entryTime,
      outingTime,
      amount,
      user,
      vehicleType,
      receivedBy,
      sourceLat,
      sourceLong,
      destLat,
      destLong,
      reserveSpaceTwoWheeler,
      reserveSpaceFourWheeler,
      time,
      vehicleNo,
    });
    return res.status(200).json({ msg: "Your parking  is booked." });
  } catch (error) {
    console.log(error);
    // return res.status(500).json({ errors: error });
  }
};

exports.bookings = async (req, res) => {
  try {
    const response = await Booking.find().sort({ updatedAt: -1 });
    return res.status(200).json({ response: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: error, msg: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Booking.findByIdAndDelete(id);
    return res.status(200).send("Your booking cancelled successfully! ");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error, msg: error.message });
  }
};

module.exports.bookingUpdate = async (req, res) => {
  const { bookingStatus } = req.body;
  console.log(req);
  console.log(req.body.bookingStatus);
  // let totalSeat = bookseat / 1 + seat / 1;
  // console.log(totalSeat);
  try {
    const response = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      { bookingStatus }
    );
    return res.status(200).json({ msg: res.message });
  } catch (error) {
    return res.status(500).json({ errors: error, msg: error.message });
  }
};

module.exports.updateParkingStatus = async (req, res) => {
  const { isParked } = req.body;
  console.log(req);
  console.log(req.body.isParked);
  // let totalSeat = bookseat / 1 + seat / 1;
  // console.log(totalSeat);
  try {
    const response = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      { isParked }
    );
    return res.status(200).json({ msg: res.message });
  } catch (error) {
    return res.status(500).json({ errors: error, msg: error.message });
  }
};

module.exports.updateRewardPoint = async (req, res) => {
  const { rewardPoint } = req.body;
  console.log(req);
  console.log(req.body.rewardPoint);
  // let totalSeat = bookseat / 1 + seat / 1;
  // console.log(totalSeat);
  try {
    const response = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { rewardPoint }
    );
    return res.status(200).json({ msg: res.message });
  } catch (error) {
    return res.status(500).json({ errors: error, msg: error.message });
  }
};

module.exports.updateBookingCount = async (req, res) => {
  const { bookingCount } = req.body;
  console.log(req);
  console.log(req.body.bookingCount);
  // let totalSeat = bookseat / 1 + seat / 1;
  // console.log(totalSeat);
  try {
    const response = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { bookingCount }
    );
    return res.status(200).json({ msg: res.message });
  } catch (error) {
    return res.status(500).json({ errors: error, msg: error.message });
  }
};
