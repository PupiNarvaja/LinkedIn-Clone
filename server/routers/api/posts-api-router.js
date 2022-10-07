const router = require("express").Router();
const postController = require("../../controllers/api-posts-controller")

//  "/api/posts"
router.get("/", postController.getPosts); // Get all posts.

router.post("/", postController.postPost); // Post a new post.

module.exports = router;
