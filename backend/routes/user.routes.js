const express = require("express");
const userCtrl = require("../controller/user.controller");
const router = express.Router();
const multer = require("multer");


const upload = multer({ dest: "uploads/" });

router.route("/api/users").get(userCtrl.list).post(userCtrl.create);
router.get("/api/users/:userId/images", userCtrl.getImages);

router
    .route("/api/users/:userId")
    .get(userCtrl.read)
    .put(userCtrl.update)
    .delete(userCtrl.remove);

router.post(
    "/api/users/upload/:userId",
    upload.single("image"),
    userCtrl.uploadImage
);

router.param("userId", userCtrl.userByID);

module.exports = router;
