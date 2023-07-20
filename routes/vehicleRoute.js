const express = require("express");
const { auth } = require("../utils/auth");

const {
  create,
  list,
  read,
  remove,
} = require("../controller/vehicleController");
const router = express.Router();

router.post("/vehicle", auth, create);
router.get("/vehicles", auth, list);
router.get("/vehicle/:id", auth, read);
router.delete("/vehicle/:id", auth, remove);

module.exports = router;
