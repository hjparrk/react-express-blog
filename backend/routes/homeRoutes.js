const express = require("express");
const homeController = require("../controllers/home");

const router = express.Router();

// constroller
router.get("/", homeController.view);

module.exports = router;