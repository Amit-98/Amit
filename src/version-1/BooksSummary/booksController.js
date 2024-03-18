const async = require("async");
const _queryHandler = require("./booksQueryHandler.js");
const _commonMethods = require("../../common/methods/commonMethods.js");
const _apiParams = require("./booksApiParams.js");
const _param_action = _apiParams.PARAM_ACTION;
const fileName = _apiParams.FILENAME.CONTROLLER;
const _constant = _apiParams.CONSTANT;
const _statusdetails = require("../.././common/constant.js");
const _status = _statusdetails.RESPONSE;
const _resmessage = _statusdetails.FINAL_RESULT_MSG;

let addBooks = (req, res, next) => {
    try 
    {
        async.waterfall([
        function(callback)
        { 
            try
            {
                req.body.PARAM_ACTION = _param_action.ADD_BOOKS;
                _queryHandler.addBooks(req, (err, _result) =>{
                    if(err)
                    {
                        return next(new Error(err));
                    }
                    try
                    {
                        if(_result.affectedRows>0)
                        {
                            callback(null, _result);
                        }
                        else
                        {
                            callback(null, _result);
                        }
                    }
                    catch(err)
                    {
                        _commonMethods.saveErrorLog(fileName,addBooks.name,err.message,req);
                        next(err);
                    }
                });
            }
            catch(err)
            {
                _commonMethods.saveErrorLog(fileName,addBooks.name,err.message,req);
                next(err);
            }
        },
        ],
        function(err, _finalResult)
        {
            if(err)
            {
                return next(new Error(err));
            }
            else
            {
                if (_finalResult.affectedRows>0) 
                {
                    res.code = _status.STATUSCODE.OK200;
                    res.status = _status.STATUS.SUCCESS;
                    res.message = _resmessage.ADDBOOKS.SAVE_SUCCESS;
                    res.result = {};
                    next();
                } 
                else
                {
                    res.code = _status.STATUSCODE.FAILED;
                    res.status = _status.STATUS.FAILED;
                    res.message = _resmessage.ADDBOOKS.SAVE_FAILED;
                    res.result = {};
                    next();
                }
            }
        });
    } 
    catch (err) 
    {
        _commonMethods.saveErrorLog(fileName,addBooks.name,err.message,req);
        next(err);
    }
};

module.exports = {
    addBooks
}