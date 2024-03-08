const Joi = require("joi").extend(require('@joi/date'));

const ResFormatter = require("../../common/joi-validator");
const _apiparam = require("./user_api_params"),
  _newuser_params = _apiparam.ADD_NEW_USER,
  _constant = _apiparam.CONSTANT;

let user_signup = (req, res, next) => {
  const schema = Joi.object({
   // [_newuser_params.AUTH_TOKEN]: Joi.string().min(1).strict().trim().required(),

    [_newuser_params.NAME]: Joi.string().strict().trim().max(30).pattern(/^[a-zA-Z ]+$/).required(),

    [_newuser_params.EMAIL]: Joi.string().strict().trim().email().pattern(new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)).min(10).max(50).required().messages({
        // 'string.email':'Please enter valid email.',
         'string.min':'Email should be atleast 10 characters.',
         'string.max':'Email is only 50 characters.',
         'string.empty':'Please enter email.',
         'string.email.maxDomainSegments':'Email address must have at least five domain segments.["com","org","in","net","biz"]',
         'any.required':'Email is required.'
       }),

    
    [_newuser_params.PASSWORD]:Joi.string().min(4).max(30).pattern(new RegExp(/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{4,15}$/)).required().messages({
        'string.min':'Password should be atleast 4 characters',
        'string.max':'Password is only 15 characters',
        'string.empty':'"Please enter the password',
        'string.pattern.base':'The password must contain at least one uppercase, one lowercase, one digit, and one special symbol.',
        'any.required':'Password is required'
    }),

   // [_newuser_params.PHOTO]: Joi.string().strict().trim().max(100).required(),

    [_newuser_params.INVITE_CODE]: Joi.string().strict().trim().max(50).required().allow('0',0),

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

let user_login = (req, res, next) => {
  const schema = Joi.object({

    [_newuser_params.EMAIL]: Joi.string().strict().trim().email().required(),

    [_newuser_params.PASSWORD]:Joi.string().strict().trim().min(4).max(30).required(),

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
    user_signup,
    user_login
};
