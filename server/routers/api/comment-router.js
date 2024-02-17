const router = require("express").Router();
const commentController = require("../../controllers/comment-controller")

//  "/api/comments"
router.route("/").post(commentController.postComment);

module.exports = router;
