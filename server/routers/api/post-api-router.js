const router = require("express").Router();
const postController = require("../../controllers/post-controller")

//  "/api/posts"
router.route("/").get(postController.getPosts)
                 .post(postController.postPost);
                 
router.route("/like").post(postController.likeAPost)
                     .delete(postController.unlikeAPost);

module.exports = router;
