const async = require("async");
const _queryhandler = require("./school_query_handler");
const _save_error_log = require("../.././common/common_methods/common_use_methods.js");
const _api_param = require("./school_api_params.js"),
  _param_action = _api_param.PARAM_ACTION, 
  fileName = _api_param.FILENAME.CONTROLLER, 
  _constant = _api_param.CONSTANT;
const _statusdetails = require("../.././common/constant.js"),
  _status = _statusdetails.STATUS,
  _status_msg = _statusdetails.FINAL_RESULT_MSG,
  _status_code = _statusdetails.FINAL_STATUS_CODE,
  _statuscode = _statusdetails.STATUSCODE;

let create_school = (req, res, next) => {
  try {
    //console.log("REQ:", req.file);
    let invite_code ="";
    async.waterfall([
      function(callback)
      {
        let image_path = _save_error_log.upload_image(req);
        if(image_path!="" && image_path!=null)
        {
          req.body.PHOTO = _statusdetails.UPLOAD_IMAGE_DESTINATION.LOCAL_URL+image_path;
        }

        invite_code = _save_error_log.Gen_invite_code();
        req.body.PARAM_ACTION = _param_action.SAVE_SCHOOL;
        req.body.INVITE_CODE = invite_code;
        req.body.SCHOOL_ID = _constant.ZERO;
        req.body.STUDENT_ID = _constant.ZERO;
        req.body.CLASS_ID = _constant.ZERO;
        _queryhandler.create_school(req, (err, _create_school_result) => {
          if (err) 
          {
            return next(new Error(err));
          }
          try
          {
            if (_create_school_result.affectedRows>0)
            {
              callback(null, _create_school_result);
            } 
            else
            {
              res.code = _status_code.FAILED;
              res.status = _status_msg.FAILED;
              res.message = _status_msg.SCHOOL.CREATE.FAILED;
              res.result = {};
              next();
            }
          }
          catch(err)
          {
            _save_error_log.Save_Error_Log(fileName,create_school.name,err.message,req);
            next(err);
          }
        });
      },
    ],
    function(err, _create_school_result)
    {
      if(err)
      {
        return next(new Error(err));
      }
      else
      {
        if (_create_school_result.affectedRows>0) 
        {
          res.code = _status_code.OK200;
          res.status = _status_msg.SUCCESS;
          res.message = _status_msg.SCHOOL.CREATE.SUCCESS;
          res.result = {};
          next();
        } 
        else
        {
          res.code = _status_code.FAILED;
          res.status = _status_msg.FAILED;
          res.message = _status_msg.SCHOOL.CREATE.FAILED;
          res.result = {};
          next();
        }
      }
    });
  } 
  catch (err) 
  {
    _save_error_log.Save_Error_Log(fileName,create_school.name,err.message,req);
    next(err);
  }
};

let create_class = (req, res, next) => {
  try {
    async.waterfall([
      function(callback)
      {
        req.body.PARAM_ACTION = _param_action.SAVE_CLASS;
        req.body.INVITE_CODE = _constant.TEMP;
        req.body.STUDENT_ID = _constant.ZERO;
        req.body.CLASS_ID = _constant.ZERO;
        req.body.PHOTO = _constant.TEMP;
        _queryhandler.create_class(req, (err, _create_class_result) => {
          if (err) 
          {
            return next(new Error(err));
          }
          try
          {
            if (_create_class_result.affectedRows>0)
            {
              callback(null, _create_class_result);
            } 
            else
            {
              res.code = _status_code.FAILED;
              res.status = _status_msg.FAILED;
              res.message = _status_msg.CLASS.CREATE.FAILED;
              res.result = {};
              next();
            }
          }
          catch(err)
          {
            _save_error_log.Save_Error_Log(fileName,create_class.name,err.message,req);
            next(err);
          }
        });
      },
    ],
    function(err, _create_school_result)
    {
      if(err)
      {
        return next(new Error(err));
      }
      else
      {
        if (_create_school_result.affectedRows>0) 
        {
          res.code = _status_code.OK200;
          res.status = _status_msg.SUCCESS;
          res.message = _status_msg.CLASS.CREATE.SUCCESS;
          res.result = {};
          next();
        } 
        else
        {
          res.code = _status_code.FAILED;
          res.status = _status_msg.FAILED;
          res.message = _status_msg.CLASS.CREATE.FAILED;
          res.result = {};
          next();
        }
      }
    });
  } 
  catch (err) 
  {
    _save_error_log.Save_Error_Log(fileName,create_class.name,err.message,req);
    next(err);
  }
};

let get_class = (req, res, next) => {
  try {
    async.waterfall([
      function(callback)
      {
        req.body.PARAM_ACTION = _param_action.GET_CLASS;
        req.body.STUDENT_ID = _constant.ZERO;
        req.body.CLASS_ID = _constant.ZERO;
        _queryhandler.get_class(req, (err, _get_class_result) => {
          if (err) 
          {
            return next(new Error(err));
          }
          try
          {
            if (_get_class_result[0]!="" && _get_class_result[0]!=null)
            {
              callback(null, _get_class_result[0]);
            } 
            else
            {
              res.code = _status_code.FAILED;
              res.status = _status_msg.FAILED;
              res.message = _status_msg.RECORDS_NOT_FOUND;
              res.result = {};
              next();
            }
          }
          catch(err)
          {
            _save_error_log.Save_Error_Log(fileName,get_class.name,err.message,req);
            next(err);
          }
        });
      },
    ],
    function(err, _get_class)
    {
      if(err)
      {
        return next(new Error(err));
      }
      else
      {
        if (_get_class!=null && _get_class!="") 
        {
          res.code = _status_code.OK200;
          res.status = _status_msg.SUCCESS;
          res.message = _status_msg.RECORDS_FOUND;
          res.result = _get_class;
          next();
        } 
        else
        {
          res.code = _status_code.FAILED;
          res.status = _status_msg.FAILED;
          res.message = _status_msg.RECORDS_NOT_FOUND;
          res.result = {};
          next();
        }
      }
    });
  } 
  catch (err) 
  {
    _save_error_log.Save_Error_Log(fileName,get_class.name,err.message,req);
    next(err);
  }
};

let create_student = (req, res, next) => {
  try {
    async.waterfall([
      function(callback)
      {
        let image_path = _save_error_log.upload_image(req);
        if(image_path!="" && image_path!=null)
        {
          req.body.PHOTO = _statusdetails.UPLOAD_IMAGE_DESTINATION.LOCAL_URL+image_path;
        }

        req.body.PARAM_ACTION = _param_action.SAVE_STUDENT;
        req.body.INVITE_CODE = _constant.TEMP;
        req.body.CLASS_ID = _constant.ZERO;
        req.body.STUDENT_ID = _constant.ZERO;
        _queryhandler.create_student(req, (err, _create_student_result) => {
          if (err) 
          {
            return next(new Error(err));
          }
          try
          {
            if (_create_student_result.affectedRows>0)
            {
              callback(null, _create_student_result);
            } 
            else
            {
              res.code = _status_code.FAILED;
              res.status = _status_msg.FAILED;
              res.message = _status_msg.STUDNET.CREATE.FAILED;
              res.result = {};
              next();
            }
          }
          catch(err)
          {
            _save_error_log.Save_Error_Log(fileName,create_student.name,err.message,req);
            next(err);
          }
        });
      },
    ],
    function(err, _create_student_result)
    {
      if(err)
      {
        return next(new Error(err));
      }
      else
      {
        if (_create_student_result.affectedRows>0) 
        {
          res.code = _status_code.OK200;
          res.status = _status_msg.SUCCESS;
          res.message = _status_msg.STUDNET.CREATE.SUCCESS;
          res.result = {};
          next();
        } 
        else
        {
          res.code = _status_code.FAILED;
          res.status = _status_msg.FAILED;
          res.message = _status_msg.STUDNET.CREATE.FAILED;
          res.result = {};
          next();
        }
      }
    });
  } 
  catch (err) 
  {
    _save_error_log.Save_Error_Log(fileName,create_student.name,err.message,req);
    next(err);
  }
};

let get_students = (req, res, next) => {
  try {
    async.waterfall([
      function(callback)
      {
        req.body.PARAM_ACTION = _param_action.GET_STUDENTS;
        req.body.STUDENT_ID = _constant.ZERO;
        req.body.CLASS_ID = _constant.ZERO;
        _queryhandler.get_students(req, (err, _get_student_result) => {
          if (err) 
          {
            return next(new Error(err));
          }
          try
          {
            if (_get_student_result[0]!="" && _get_student_result[0]!=null)
            {
              callback(null, _get_student_result[0]);
            } 
            else
            {
              res.code = _status_code.FAILED;
              res.status = _status_msg.FAILED;
              res.message = _status_msg.RECORDS_NOT_FOUND;
              res.result = {};
              next();
            }
          }
          catch(err)
          {
            _save_error_log.Save_Error_Log(fileName,get_students.name,err.message,req);
            next(err);
          }
        });
      },
    ],
    function(err, _get_student_result)
    {
      if(err)
      {
        return next(new Error(err));
      }
      else
      {
        if (_get_student_result!=null && _get_student_result!="") 
        {
          res.code = _status_code.OK200;
          res.status = _status_msg.SUCCESS;
          res.message = _status_msg.RECORDS_FOUND;
          res.result = _get_student_result;
          next();
        } 
        else
        {
          res.code = _status_code.FAILED;
          res.status = _status_msg.FAILED;
          res.message = _status_msg.RECORDS_NOT_FOUND;
          res.result = {};
          next();
        }
      }
    });
  } 
  catch (err) 
  {
    _save_error_log.Save_Error_Log(fileName,get_students.name,err.message,req);
    next(err);
  }
};

let assign_student = (req, res, next) => {
  try {
    async.waterfall([
      function(callback)
      {
        req.body.PARAM_ACTION = _param_action.STUDENT_ASSIGN;
        req.body.SCHOOL_ID = _constant.ZERO;
        _queryhandler.assign_student(req, (err, _get_result) => {
          if (err) 
          {
            return next(new Error(err));
          }
          try
          {
            if (_get_result.affectedRows>0)
            {
              callback(null, _get_result);
            } 
            else
            {
              res.code = _status_code.FAILED;
              res.status = _status_msg.FAILED;
              res.message = _status_msg.STUDNET.ASSIGN.FAILED;
              res.result = {};
              next();
            }
          }
          catch(err)
          {
            _save_error_log.Save_Error_Log(fileName,assign_student.name,err.message,req);
            next(err);
          }
        });
      },
    ],
    function(err, _get_result)
    {
      if(err)
      {
        return next(new Error(err));
      }
      else
      {
        if (_get_result.affectedRows>0) 
        {
          res.code = _status_code.OK200;
          res.status = _status_msg.SUCCESS;
          res.message = _status_msg.STUDNET.ASSIGN.SUCCESS;
          res.result = {};
          next();
        } 
        else
        {
          res.code = _status_code.FAILED;
          res.status = _status_msg.FAILED;
          res.message = _status_msg.STUDNET.ASSIGN.FAILED;
          res.result = {};
          next();
        }
      }
    });
  } 
  catch (err) 
  {
    _save_error_log.Save_Error_Log(fileName,assign_student.name,err.message,req);
    next(err);
  }
};

let get_students_all_class_assign = (req, res, next) => {
  try {
    async.waterfall([
      function(callback)
      {
        req.body.PARAM_ACTION = _param_action.GET_ALL_CLASS_ASSIGNED_STUDENT;
        req.body.SCHOOL_ID = _constant.ZERO;
        req.body.CLASS_ID = _constant.ZERO;
        req.body.STUDENT_ID = _constant.ZERO;
        _queryhandler.assign_student_all_class(req, (err, _get_result) => {
          if (err) 
          {
            return next(new Error(err));
          }
          try
          {
            if (_get_result[0]!="" && _get_result[0]!=null)
            {
              callback(null, _get_result[0]);
            } 
            else
            {
              res.code = _status_code.FAILED;
              res.status = _status_msg.FAILED;
              res.message = _status_msg.RECORDS_NOT_FOUND;
              res.result = {};
              next();
            }
          }
          catch(err)
          {
            _save_error_log.Save_Error_Log(fileName,get_students_all_class_assign.name,err.message,req);
            next(err);
          }
        });
      },
    ],
    function(err, _get_result)
    {
      if(err)
      {
        return next(new Error(err));
      }
      else
      {
        if (_get_result!=null && _get_result!="") 
        {
          res.code = _status_code.OK200;
          res.status = _status_msg.SUCCESS;
          res.message = _status_msg.RECORDS_FOUND;
          res.result = _get_result;
          next();
        } 
        else
        {
          res.code = _status_code.FAILED;
          res.status = _status_msg.FAILED;
          res.message = _status_msg.RECORDS_NOT_FOUND;
          res.result = {};
          next();
        }
      }
    });
  } 
  catch (err) 
  {
    _save_error_log.Save_Error_Log(fileName,get_students_all_class_assign.name,err.message,req);
    next(err);
  }
};

let get_classmates = (req, res, next) => {
  try {
    async.waterfall([
      function(callback)
      {
        req.body.PARAM_ACTION = _param_action.GET_CLASSMATES;
        req.body.SCHOOL_ID = _constant.ZERO;
        req.body.CLASS_ID = _constant.ZERO;
        _queryhandler.assign_student_all_class(req, (err, _get_result) => {
          if (err) 
          {
            return next(new Error(err));
          }
          try
          {
            //console.log("CHECK:", _get_result);
            if (_get_result[0]!="" && _get_result[0]!=null)
            {
              callback(null, _get_result[0]);
            } 
            else
            {
              res.code = _status_code.FAILED;
              res.status = _status_msg.FAILED;
              res.message = _status_msg.RECORDS_NOT_FOUND;
              res.result = {};
              next();
            }
          }
          catch(err)
          {
            _save_error_log.Save_Error_Log(fileName,get_students_all_class_assign.name,err.message,req);
            next(err);
          }
        });
      },
    ],
    function(err, _get_result)
    {
      if(err)
      {
        return next(new Error(err));
      }
      else
      {
        if (_get_result!=null && _get_result!="") 
        {
          res.code = _status_code.OK200;
          res.status = _status_msg.SUCCESS;
          res.message = _status_msg.RECORDS_FOUND;
          res.result = _get_result;
          next();
        } 
        else
        {
          res.code = _status_code.FAILED;
          res.status = _status_msg.FAILED;
          res.message = _status_msg.RECORDS_NOT_FOUND;
          res.result = {};
          next();
        }
      }
    });
  } 
  catch (err) 
  {
    _save_error_log.Save_Error_Log(fileName,get_students_all_class_assign.name,err.message,req);
    next(err);
  }
};

let get_schools = (req, res, next) => {
  try {
    async.waterfall([
      function(callback)
      {
        req.body.PARAM_ACTION = _param_action.GET_SCHOOLS;
        req.body.STUDENT_ID = _constant.ZERO;
        req.body.CLASS_ID = _constant.ZERO;
        req.body.NAME = _constant.TEMP;
        req.body.SCHOOL_ID = _constant.ZERO;
        req.body.PHOTO = _constant.TEMP;
        _queryhandler.get_schools(req, (err, _get_result) => {
          if (err) 
          {
            return next(new Error(err));
          }
          try
          {
            if (_get_result[0]!="" && _get_result[0]!=null)
            {
              callback(null, _get_result[0]);
            } 
            else
            {
              res.code = _status_code.FAILED;
              res.status = _status_msg.FAILED;
              res.message = _status_msg.RECORDS_NOT_FOUND;
              res.result = {};
              next();
            }
          }
          catch(err)
          {
            _save_error_log.Save_Error_Log(fileName,get_schools.name,err.message,req);
            next(err);
          }
        });
      },
    ],
    function(err, _get_result)
    {
      if(err)
      {
        return next(new Error(err));
      }
      else
      {
        if (_get_result!=null && _get_result!="") 
        {
          res.code = _status_code.OK200;
          res.status = _status_msg.SUCCESS;
          res.message = _status_msg.RECORDS_FOUND;
          res.result = _get_result;
          next();
        } 
        else
        {
          res.code = _status_code.FAILED;
          res.status = _status_msg.FAILED;
          res.message = _status_msg.RECORDS_NOT_FOUND;
          res.result = {};
          next();
        }
      }
    });
  } 
  catch (err) 
  {
    _save_error_log.Save_Error_Log(fileName,get_schools.name,err.message,req);
    next(err);
  }
};

module.exports = {
    create_school,
    create_class,
    get_class,
    create_student,
    get_students,
    assign_student,
    get_students_all_class_assign,
    get_classmates,
    get_schools
};