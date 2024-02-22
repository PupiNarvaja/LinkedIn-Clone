const router = require("express").Router();
const isAuthenticated = require("../../middlewares/isAuthenticated");
const commentController = require("../../controllers/comment-controller")

//  "/api/comments"
//router.use(isAuthenticated);

router.route("/").post(commentController.postComment);

router.route("/delete/:id").delete(commentController.deleteComment);

module.exports = router;
