const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

// constroller

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/kakao-auth/login", authController.kakaoAuth);
router.get("/kakao-auth/callback", authController.kakaoAuthCallback);

module.exports = router;
