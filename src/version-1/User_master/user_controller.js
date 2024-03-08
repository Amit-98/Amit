const async = require("async");
const JWT = require('../../common/jwt');
const _queryhandler = require("./user_query_handler.js");
const _save_error_log = require("../.././common/common_methods/common_use_methods.js");
const path = require("path");
const fs = require('fs');
const _api_param = require("./user_api_params.js"),
  _param_action = _api_param.PARAM_ACTION, 
  fileName = _api_param.FILENAME.CONTROLLER, 
  _constant = _api_param.CONSTANT;
const _statusdetails = require("../.././common/constant.js"), 
  _status = _statusdetails.STATUS,
  _status_msg = _statusdetails.FINAL_RESULT_MSG,
  _status_code = _statusdetails.FINAL_STATUS_CODE,
  _statuscode = _statusdetails.STATUSCODE;

let user_signup = (req, res, next) => {
  try {
    let body = req.body;
    async.waterfall([
      function(callback)
      {
        req.body.PARAM_ACTION = _param_action.CHECK_EMAIL;
        _queryhandler.user_signup(req, (err, _user_results) => {
          if (err) 
          {
            return next(new Error(err));
          }
          try
          {
            if (_user_results[0]!="" && _user_results[0]!=null) 
            {
              let n = _user_results[0][0];
              callback(null, n);
            } 
            else
            {
              res.code = _status_code.FAILED;
              res.status = _status_msg.FAILED;
              res.message = _status_msg.USER.SIGNUP.FAILED;
              res.result = {};
              next();
            }
          }
          catch(err)
          {
            _save_error_log.Save_Error_Log(fileName,user_signup.name,err.message,req);
            next(err);
          }
        });
      },
      function(result, callback)
      {
        if(result.COUNT == 0)
        {
        let image_path = _save_error_log.upload_image(req);
        if(image_path!="" && image_path!=null)
        {
          req.body.PHOTO = _statusdetails.UPLOAD_IMAGE_DESTINATION.LOCAL_URL+image_path;
        }

        if(body.INVITE_CODE == '0' && body.INVITE_CODE == 0)
        {
           
            req.body.USER_TYPE = _constant.ADMIN;
        }
        else
        {
            req.body.USER_TYPE = _constant.PT;
        }
        req.body.PARAM_ACTION = _param_action.USER_SIGNUP;
        _queryhandler.user_signup(req, (err, _user_results) => {
          if (err) 
          {
            return next(new Error(err));
          }
          try
          {
            //console.log("CHECK:", _user_results);
            if (_user_results.affectedRows>0) 
            {
              callback(null, _user_results);
            } 
            else
            {
              res.code = _status_code.FAILED;
              res.status = _status_msg.FAILED;
              res.message = _status_msg.USER.SIGNUP.FAILED;
              res.result = {};
              next();
            }
          }
          catch(err)
          {
            _save_error_log.Save_Error_Log(fileName,user_signup.name,err.message,req);
            next(err);
          }
        });
      }
      else
      {
        res.code = _status_code.FAILED;
        res.status = _status_msg.FAILED;
        res.message = _status_msg.USER.SIGNUP.EXIST;
        res.result = {};
        next();
      }
      },
    ],
    function(err, _user_result)
    {
      if(err)
      {
        return next(new Error(err));
      }
      else
      {
        if (_user_result.affectedRows>0) 
        {
          res.code = _status_code.OK200;
          res.status = _status_msg.SUCCESS;
          res.message = _status_msg.USER.SIGNUP.SUCCESS;
          res.result = {};
          next();
        } 
        else
        {
          res.code = _status_code.FAILED;
          res.status = _status_msg.FAILED;
          res.message = _status_msg.USER.SIGNUP.FAILED;
          res.result = {};
          next();
        }
      }
    });
  } 
  catch (err) 
  {
    _save_error_log.Save_Error_Log(fileName,user_signup.name,err.message,req);
    next(err);
  }
};

let user_login = (req, res, next) => {
  try {
    async.waterfall([
      function(callback)
      {
        req.body.PARAM_ACTION = _param_action.USER_LOGIN;
        req.body.NAME = _constant.TEMP;
        req.body.PHOTO = _constant.TEMP;
        req.body.INVITE_CODE = _constant.TEMP;
        req.body.USER_TYPE = _constant.TEMP;
        _queryhandler.user_login(req, (err, _user_login_results) => {
          if (err) 
          {
            return next(new Error(err));
          }
          try
          {
            //console.log("CHECK:", _user_login_results[0]);
            if (_user_login_results[0]!="" && _user_login_results[0]!=null)
            {
              callback(null, _user_login_results[0]);
            } 
            else
            {
              res.code = _status_code.FAILED;
              res.status = _status_msg.FAILED;
              res.message = _status_msg.USER.LOGIN.FAILED;
              res.result = {};
              next();
            }
          }
          catch(err)
          {
            _save_error_log.Save_Error_Log(fileName,user_login.name,err.message,req);
            next(err);
          }
        });
      },
    ],
    function(err, _user_login_results)
    {
      if(err)
      {
        return next(new Error(err));
      }
      else
      {
        temp = {
          USER_ID:_user_login_results[0].USER_ID,
          NAME:_user_login_results[0].NAME,
          EMAIL:_user_login_results[0].EMAIL
        }
        let JWT_token = JWT.tokenCreate(temp);
        _user_login_results[0].TOKEN = JWT_token;
        if (_user_login_results[0]!=null && _user_login_results[0]!="") 
        {
          res.code = _status_code.OK200;
          res.status = _status_msg.SUCCESS;
          res.message = _status_msg.USER.LOGIN.SUCCESS;
          res.result = _user_login_results[0];
          next();
        } 
        else
        {
          res.code = _status_code.FAILED;
          res.status = _status_msg.FAILED;
          res.message = _status_msg.USER.LOGIN.FAILED;
          res.result = {};
          next();
        }
      }
    });
  } 
  catch (err) 
  {
    _save_error_log.Save_Error_Log(fileName,user_login.name,err.message,req);
    next(err);
  }
};

module.exports = {
    user_signup,
    user_login
};