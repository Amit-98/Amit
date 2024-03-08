module.exports={
    JWT_SECRET_CODE: 'BHNAKGSAKJKD',
    STATUS:
    {
        SUCCESS:"Success",
        FAILED:"Fail",
        ERROR:"Error",
        EXIST : "Exist",
        AUTHORIZED:"Authorized",
        INVALIDTOKEN:"InvalidToken",
        TOKENEXPIRED:"TokenExpire"
    },
    STATUSCODE:
    {
        OK200:"200",
        BADREQ400:"400",
        ERROR500:"500",
        UNAUTH:401,
        EXIST : "Exist",
    },

    UPLOAD_IMAGE_DESTINATION:{
        LOCAL_PATH:"C:\\Users\\Amit Yadav\\Desktop\\Practical_Test\\Amit\\src\\Images\\School_Images\\",
        SERVER_PATH:"",
        LOCAL_URL:"/Images/School_Images/",
        SERVER_URL:""
    },

   FILENAME:{
    CONTROLLER:"Common_use_method.js",
   },

   FINAL_STATUS_CODE:{
        OK200:200,
        BADREQ400:"400",
        ERROR500:"500",
        EXIST : "Exist",
        FAILED:400,
        SUCCESS:200,
        FAILED_AUTH:401,
    },

    OTP_PARAMETER:{
        NUM:"0123456789",
        LEN:"6",
        CODE:"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        CHAR:"ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstwxyz@#$%^&*()/",
        CHAR_LEN:"30"
    },

    API_KEY:{
        KEY:"ZG34g7#Cgpc)ZQMtnfXIb$QJGTKg^h"
    },

   FINAL_RESULT_MSG:{
    USER:{
        SIGNUP:{
            SUCCESS:"User saved successfully.",
            FAILED:"User not saved.",
            EXIST:"Email already exist."
        },
        LOGIN:{
            SUCCESS:"Record found successfully.",
            FAILED:"Record not found.",
        }
    },
    SCHOOL:{
        CREATE:{
            SUCCESS:"School saved successfully.",
            FAILED:"School not saved.",
        }
    },
    CLASS:{
        CREATE:{
            SUCCESS:"Class saved successfully.",
            FAILED:"Class not saved.",
        }
    },
    STUDNET:{
        CREATE:{
            SUCCESS:"Student saved successfully.",
            FAILED:"Student not saved.",
        },
        ASSIGN:{
            SUCCESS:"Student assigned successfully.",
            FAILED:"Student not assigned.",
        }
    },

    IMAGE:{
        SUCCESS:"Image upload successfully.",
        FAILED:"Image not uploaded.",
        SELECT_FILE:"Image not select, please select image.",
        IMAGE_PATH_NOT_SET:"Image path not set.",
        PREVIOUS_IMAGE_NOT_DELETED:"Could not delete the file.",
        INVALID_FILE:"Invalid file.",
        FILE_TOO_LARGE:"File to large, file size must be 2 mb."
    },

    RECORDS_NOT_FOUND:"Record not found.",
    RECORDS_FOUND:"Record found successfully.",
    SAVE:"Data Save sucessfully",
    UPDATE:"Data update successfully.",
    FAILED:"Failed",
    FAILED_AUTH:"Fail",
    SUCCESS:"Success",
    EXIST:"EXIST",
    UN_AUTHORIZED:"Session Token expired, please try again.",
    NOT_EXIST:"NOT EXIST",
   },
}