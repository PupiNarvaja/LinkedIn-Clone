const router = require("express").Router();
const isAuthenticated = require("../../middlewares/isAuthenticated");
const postController = require("../../controllers/post-controller")

//  "/api/posts"
router.use(isAuthenticated);

router.route("/").get(postController.getPosts)
                 .post(postController.postPost);
                 
router.route("/like").post(postController.likeAPost)
                     .delete(postController.unlikeAPost);

module.exports = router;
