const express = require("express");
const {
  list,
  read,
  regiserValidations,
  loginValidations,
  updateProfileImage,
} = require("../controller/parkingController");
const upload = require("../middleware/upload");
const { auth } = require("../utils/auth");
const {
  parkingRegister,
  parkingLogin,
  updateTwoWheelerSpace,
  updateFourWheelerSpace,
} = require("../controller/parkingController");
const router = express.Router();

router.post("/pregister", regiserValidations, parkingRegister);
router.post("/login", loginValidations, parkingLogin);
router.get("/parkings", list);
router.get("/parking/:id", auth, read);
router.put(
  "/pprofilepic/:id",
  auth,
  upload.single("image"),
  updateProfileImage
);

router.post("/twoWheelerSpacke/:id", updateTwoWheelerSpace);
router.post("/fourWheelerSpacke/:id", updateFourWheelerSpace);

module.exports = router;
