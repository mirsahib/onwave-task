// import express from "express";
// import userCtrl from "../controllers/user.controller";
const express = require("express");
const userCtrl = require("../controller/user.controller");
const router = express.Router();

router.route("/api/users").get(userCtrl.list).post(userCtrl.create);

router
    .route("/api/users/:userId")
    .get(userCtrl.read)
    .put(userCtrl.update)
    .delete(userCtrl.remove);

router.param("userId", userCtrl.userByID);

module.exports = router;