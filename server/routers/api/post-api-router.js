const router = require("express").Router();
const postController = require("../../controllers/api-post-controller")

//  "/api/posts"
router.route("/").get(postController.getPosts)
                 .post(postController.postPost);
                 
router.route("/comment").post(postController.postComment);

module.exports = router;
