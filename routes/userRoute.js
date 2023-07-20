const express = require("express");
const {
  list,
  read,
  login,
  register,
  regiserValidations,
  loginValidations,
  updateProfileImage,
  remove,
  booking,
  bookings,
  bookingUpdate,
  updateParkingStatus,
  updateRewardPoint,
  updateBookingCount,
} = require("../controller/userController");
const upload = require("../middleware/upload");
const { auth } = require("../utils/auth");
const router = express.Router();

router.post("/register", regiserValidations, register);
router.post("/login", loginValidations, login);
router.get("/users", list);
router.get("/user/:id", auth, read);
router.put("/profilepic/:id", auth, upload.single("image"), updateProfileImage);
router.post("/booking", booking);
router.get("/bookings", bookings);
router.delete("/booking/:id", remove);
router.post("/bookingUpdate/:id", bookingUpdate);
router.post("/updateParkingStatus/:id", updateParkingStatus);
router.post("/updateRewardPoint/:id", updateRewardPoint);
router.post("/updateBookingCount/:id", updateBookingCount);

module.exports = router;
