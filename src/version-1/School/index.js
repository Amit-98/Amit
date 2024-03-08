const express = require('express');
const route = require("express").Router();
const _schoolValidator = require("./school_req_validator");
const _schoolController = require("./school_controller");
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

//done
route.post(
    "/createschool",
     JWT.tokenVerify,
     JWT.verify_Apikey,
     upload.single('PHOTO'),
    _schoolValidator.create_school,
    _schoolController.create_school
);

route.post(
    "/getschools",
     JWT.tokenVerify,
     JWT.verify_Apikey,
    _schoolValidator.get_schools,
    _schoolController.get_schools
);

//done
route.post(
    "/createclass",
     JWT.tokenVerify,
     JWT.verify_Apikey,
    _schoolValidator.create_class,
    _schoolController.create_class
);

//done
route.post(
    "/getclass",
     JWT.tokenVerify,
     JWT.verify_Apikey,
    _schoolValidator.get_class,
    _schoolController.get_class
);

//done
route.post(
    "/createstudent",
     JWT.tokenVerify,
     JWT.verify_Apikey,
     upload.single('PHOTO'),
    _schoolValidator.create_student,
    _schoolController.create_student
);

//done
route.post(
    "/getstudents",
     JWT.tokenVerify,
     JWT.verify_Apikey,
    _schoolValidator.get_students,
    _schoolController.get_students
);

//done
route.post(
    "/assignstudent",
     JWT.tokenVerify,
     JWT.verify_Apikey,
    _schoolValidator.assign_student,
    _schoolController.assign_student
);

route.post(
    "/getstudentsallclass",
     JWT.tokenVerify,
     JWT.verify_Apikey,
    //_schoolValidator.get_students_all_class_assign,
    _schoolController.get_students_all_class_assign
);

route.post(
    "/getclassmates",
     JWT.tokenVerify,
     JWT.verify_Apikey,
    _schoolValidator.get_classmates,
    _schoolController.get_classmates
);

module.exports = route;