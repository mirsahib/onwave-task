const express = require("express");
const userCtrl = require("../controller/user.controller");
const router = express.Router();
const multer = require("multer");

// Multer setup for handling file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/"); // Specify the destination directory for uploaded files
//     },
//     filename: function (req, file, cb) {
//         // Generate a unique filename for each uploaded file
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });
//const upload = multer({ storage: storage });
const upload = multer({ dest: "uploads/" });

router.route("/api/users").get(userCtrl.list).post(userCtrl.create);

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
