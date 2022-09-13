const express = require("express");

const router = express.Router();
const userCtrl = require("../controllers/user");

router.post("/signUp", userCtrl.signUp);
router.post("/login", userCtrl.login);
router.get("/users", userCtrl.users);
router.delete("/delete", userCtrl.delete)

module.exports = router;
