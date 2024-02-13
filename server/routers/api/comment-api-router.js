const router = require("express").Router();
const commentController = require("../../controllers/api-comment-controller")

//  "/api/comments"
router.route("/").get(commentController.getComments)
                 .post(commentController.postComment);

module.exports = router;
