const _api_param = require("./school_api_params");
const _sp_name = _api_param.SP_NAMES;

let school_master = (reqJson) => {
    var _query = `CALL ${_sp_name.SCHOOL_MASTER}('${reqJson.body.PARAM_ACTION}','${reqJson.body.NAME}','${reqJson.body.INVITE_CODE}', 
    '${reqJson.body.PHOTO}', '${reqJson.body.SCHOOL_ID}', '${reqJson.body.STUDENT_ID}', '${reqJson.body.CLASS_ID}')`;
    return _query;
};

let school_master_get = (reqJson) => {
    var _query = `CALL ${_sp_name.SCHOOL_GET}('${reqJson.body.PARAM_ACTION}','${reqJson.body.SCHOOL_ID}' 
    ,'${reqJson.body.CLASS_ID}','${reqJson.body.STUDENT_ID}')`;
    return _query;
};

let user_master = (reqJson) => {
    var _query = `CALL ${_sp_name.USER_MASTER}('${reqJson.body.PARAM_ACTION}','${reqJson.body.USER_TYPE}')`;
    return _query;
};

module.exports = {
    school_master,
    user_master,
    school_master_get
};
