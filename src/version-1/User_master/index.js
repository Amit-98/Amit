const express = require('express');
const route = require("express").Router();
const _userValidator = require("./user_req_validator");
const _userController = require("./user_controller");
const multer = require('multer');
const path = require('path');
const _constant = require("../.././common/constant");

const storage = multer.diskStorage({
  destination:_constant.UPLOAD_IMAGE_DESTINATION.LOCAL_PATH,
  filename:(req, file, cb) =>{
  return cb(null, `IMG_${Date.now()}${path.extname(file.originalname)}`)
  }
});

const upload = multer({
  storage:storage,
  limit:{fileSize:100000}
});

route.post(
  "/signup",
   upload.single('PHOTO'),
  _userValidator.user_signup,
  _userController.user_signup
);

route.post(
    "/login",
    _userValidator.user_login,
    _userController.user_login
);

module.exports = route;