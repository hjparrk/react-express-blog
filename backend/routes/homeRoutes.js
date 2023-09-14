const express = require("express");
const homeController = require("../controllers/home");

const router = express.Router();

// controller
router.get("/", homeController.view);

module.exports = router;
