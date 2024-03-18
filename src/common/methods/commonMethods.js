const route = require("express").Router();
const _constant = require("../constant.js");
const _dbhelper = require("../../db/db-runner.js");
const api_error_log_detail = require("../../db/db-schema/api_error_log_detail.js");
const _otp_parameter = _constant.OTP_PARAMETER;
let _status_msg = _constant.FINAL_RESULT_MSG;
let _status_code = _constant.FINAL_STATUS_CODE;

function OTP_Generate()
{
  var len =_otp_parameter.LEN;
  const characters = _otp_parameter.NUM;
  let otp_result = '';
  const charactersLength = characters.length;
  for ( let i = 0; i < len; i++ ) 
  {
    otp_result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return otp_result;
}

function Gen_invite_code()
{
  var len =_otp_parameter.LEN;
  const characters = _otp_parameter.CODE;
  let code_result = '';
  const charactersLength = characters.length;
  for ( let i = 0; i < len; i++ ) 
  {
    code_result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return code_result;
}

function Gen_auth_token()
{
  var len =_otp_parameter.CHAR_LEN;
  const characters = _otp_parameter.CHAR;
  let token_result = '';
  const charactersLength = characters.length;
  for ( let i = 0; i < len; i++ ) 
  {
    token_result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return token_result;
}

function upload_image(req)
{
  //console.log("CHECK:", req);
  let final_imagePath = "";
  if(req.file == null && req.file == "")
  {
    res.status = _status_msg.FAILED;
    res.code = _status_code.FAILED;
    res.message = _status_msg.IMAGE.FAILED
    res.result = {};
    next();
  }
  else
  {
    var image = req.file;
    const array_of_allowed_files = ['png','jpeg','jpg','PNG','JPEG','JPG'];
    const array_of_allowed_file_types = ['image/png', 'image/jpeg', 'image/jpg'];
    
    // Allowed file size in mb
    const allowed_file_size = 2;

    const file_extension = image.originalname.slice(
      ((image.originalname.lastIndexOf('.') - 1) >>> 0) + 2
    );

    // Check if the uploaded file is allowed
    //|| !array_of_allowed_file_types.includes(image.memetype)
    if (!array_of_allowed_files.includes(file_extension) || !array_of_allowed_file_types.includes(image.mimetype))
    {
      res.status = _status_msg.FAILED;
      res.code = _status_code.FAILED;
      res.message = _status_msg.IMAGE.INVALID_FILE;  
      res.result = {};
      next();
    }
    else if ((image.size / (1024 * 1024)) > allowed_file_size)
    {                  
      res.status = _status_msg.FAILED;
      res.code = _status_code.FAILED;
      res.message = _status_msg.IMAGE.FILE_TOO_LARGE;
      res.result = {};
      next();
    }
    else
    {
      //profile_url =`http://192.168.29.7:3000/src/Images/Customer_Images/${req.file.filename}`;
      final_imagePath = `${req.file.filename}`;
      return final_imagePath;
    }
  }
}

let saveErrorLog = (_fileName, _funName, _errorMsg, _reqJson) => {
  const myreqJSON = JSON.stringify(_reqJson.body);
  //console.log(_reqJson.body);
  if(_errorMsg>1000)
  {
    //let text = "Hello world!";
    _errorMsg = _errorMsg.substring(0,999);
  }
  if(myreqJSON>5000)
  {
    myreqJSON = myreqJSON.substring(0,4999);
  }
  var _query = `INSERT INTO ${api_error_log_detail.TABLE}
  (
  ${api_error_log_detail.FIELDS.FILE_NAME},
  ${api_error_log_detail.FIELDS.METHOD_NAME},
  ${api_error_log_detail.FIELDS.ERROR_DETAILS},
  ${api_error_log_detail.FIELDS.REQUEST_JSON_BODY},
  ${api_error_log_detail.FIELDS.DATE_TIME}
  )values('${_fileName}','${_funName}','${_errorMsg}','${myreqJSON}',now())`;
    _dbhelper.InsertQueryErrorLog(_query);
  // console.log("Filename: ",_fileName);
  // console.log("Function_Name: ",_funName);
  // console.log("Error_msg: ",_errorMsg);
  //console.log("Request",_reqJson);
  //return "0";
  console.log("QUERY",_query);
  return _query;
};

module.exports = {
  OTP_Generate,
  saveErrorLog,
  Gen_auth_token,
  Gen_invite_code,
  upload_image
};
