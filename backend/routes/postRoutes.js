const express = require("express")
const postController = require("../controllers/post")

const router = express.Router()

router.post("/posts", postController.store)

module.exports = router;