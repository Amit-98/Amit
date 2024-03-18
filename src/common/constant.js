module.exports={
    JWT_SECRET_CODE: 'BHNAKGSAKJKD',
    RESPONSE:
    {
        STATUSCODE:{
            OK200:200,
            BADREQ400:"400",
            ERROR500:"500",
            EXIST : "Exist",
            FAILED:400,
            SUCCESS:200,
            FAILED_AUTH:401,
        },

        STATUS:{
            SUCCESS:"Success",
            FAILED:"Failed",
            ERROR:"Error",
            EXIST : "Exist",
            AUTHORIZED:"Authorized",
            INVALIDTOKEN:"InvalidToken",
            TOKENEXPIRED:"TokenExpire"
        },
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
    ADDBOOKS:{
        SUCCESS:"Record found successfully.",
        FAILED:"Record not found.",
        SAVE_SUCCESS:"Book added successfully.",
        SAVE_FAILED:"Book not saved."
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