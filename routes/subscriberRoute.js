const express = require("express");
const { auth } = require("../utils/auth");
const {
  create,
  list,
  read,
  remove,
} = require("../controller/subsCriberController");
const router = express.Router();

router.post("/subscription", auth, create);
router.get("/subscriptions", auth, list);
router.get("/subscription/:id", auth, read);
router.delete("/subscription/:id", auth, remove);

module.exports = router;
