const express = require('express');
const route = require("express").Router();
const _booksValidator = require("./booksRequestValidator");
const _booksController = require("./booksController");
const { body } = require("express-validator");
const JWT = require('../../common/jwt');
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
    "/addbooks",
     //JWT.tokenVerify,
     //JWT.verify_Apikey,
     //upload.single('PHOTO'),
    _booksValidator.addBooks,
    _booksController.addBooks
);

module.exports = route;