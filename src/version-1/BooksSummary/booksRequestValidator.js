const Joi = require("joi").extend(require('@joi/date'));
const ResFormatter = require("../../common/joi-validator");
const _apiparam = require("./booksApiParams");
const _addbooksparam = _apiparam.ADD_NEW_BOOKS;
const _constant = _apiparam.CONSTANT;

let addBooks = (req, res, next) => {
const schema = Joi.object(
    {
        [_addbooksparam.NAME]: Joi.string().strict().trim().min(1).max(100).required(),

        [_addbooksparam.TITLE]: Joi.string().strict().trim().min(1).max(200).required(),
        
        [_addbooksparam.CONTENT]: Joi.string().strict().trim().min(1).required(),
    }
);
let body = req.body; 
    let { error } = schema.validate(body);
    if (error) 
    {
        next(ResFormatter.resError(error, "Invalid data in request json."));
    } 
    else 
    {
        next();
    }
};

module.exports = {
    addBooks
}