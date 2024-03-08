const Joi = require("joi").extend(require('@joi/date'));
const ResFormatter = require("../../common/joi-validator");
const _apiparam = require("./school_api_params"),
  _school_params = _apiparam.ADD_NEW_SCHOOL,
  _constant = _apiparam.CONSTANT;

let create_school = (req, res, next) => {
  const schema = Joi.object({

    [_school_params.NAME]: Joi.string().strict().trim().min(1).max(30).required(),

  });
  let body = req.body;
  let { error } = schema.validate(body);
  if (error) 
  {
    next(ResFormatter.resError(error, "Invalid data in request json."));
  } else 
  {
    next();
  }
};

let create_class = (req, res, next) => {
  const schema = Joi.object({

    [_school_params.NAME]: Joi.string().strict().trim().min(1).max(30).required(),

    [_school_params.SCHOOL_ID]: Joi.number().min(0).required(),

  });
  let body = req.body;
  let { error } = schema.validate(body);
  if (error) 
  {
    next(ResFormatter.resError(error, "Invalid data in request json."));
  } else 
  {
    next();
  }
};

let get_class = (req, res, next) => {
  const schema = Joi.object({

    [_school_params.SCHOOL_ID]: Joi.number().min(0).required(),

  });
  let body = req.body;
  let { error } = schema.validate(body);
  if (error) 
  {
    next(ResFormatter.resError(error, "Invalid data in request json."));
  } else 
  {
    next();
  }
};

let create_student = (req, res, next) => {
  const schema = Joi.object({

    [_school_params.NAME]: Joi.string().strict().trim().min(1).max(30).required(),

    [_school_params.SCHOOL_ID]: Joi.number().min(0).required(),

  });
  let body = req.body;
  let { error } = schema.validate(body);
  if (error) 
  {
    next(ResFormatter.resError(error, "Invalid data in request json."));
  } else 
  {
    next();
  }
};

let get_students = (req, res, next) => {
  const schema = Joi.object({

    [_school_params.SCHOOL_ID]: Joi.number().min(0).required(),

   // [_school_params.CLASS_ID]: Joi.number().min(0).required(),

  });
  let body = req.body;
  let { error } = schema.validate(body);
  if (error) 
  {
    next(ResFormatter.resError(error, "Invalid data in request json."));
  } else 
  {
    next();
  }
};

let assign_student = (req, res, next) => {
  const schema = Joi.object({

    [_school_params.CLASS_ID]: Joi.number().min(0).required(),

    [_school_params.STUDENT_ID]: Joi.number().min(0).required(),

  });
  let body = req.body;
  let { error } = schema.validate(body);
  if (error) 
  {
    next(ResFormatter.resError(error, "Invalid data in request json."));
  } else 
  {
    next();
  }
};

let get_classmates = (req, res, next) => {
  const schema = Joi.object({

    [_school_params.STUDENT_ID]: Joi.number().min(0).required(),

  });
  let body = req.body;
  let { error } = schema.validate(body);
  if (error) 
  {
    next(ResFormatter.resError(error, "Invalid data in request json."));
  } else 
  {
    next();
  }
};

let get_schools = (req, res, next) => {
  const schema = Joi.object({

    [_school_params.INVITE_CODE]: Joi.string().strict().trim().min(6).max(10).required(),

  });
  let body = req.body;
  let { error } = schema.validate(body);
  if (error) 
  {
    next(ResFormatter.resError(error, "Invalid data in request json."));
  } else 
  {
    next();
  }
};

module.exports = {
    create_school,
    create_class,
    get_class,
    create_student,
    get_students,
    assign_student,
    get_classmates,
    get_schools
};
