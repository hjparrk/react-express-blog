const express = require("express")
const postController = require("../controllers/post")

const router = express.Router()

router.post("/posts", postController.store)
router.get("/posts/:postId", postController.view)

module.exports = router;