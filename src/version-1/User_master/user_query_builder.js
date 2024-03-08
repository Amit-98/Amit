const _api_param = require("./user_api_params.js");
const _sp_name = _api_param.SP_NAMES;

let user_master_save = (reqJson) => {
    var _query = `CALL ${_sp_name.USER_MASTER_SAVE}('${reqJson.body.PARAM_ACTION}','${ reqJson.body.NAME}','${reqJson.body.EMAIL}',
    '${reqJson.body.PASSWORD}', '${reqJson.body.PHOTO}', '${reqJson.body.INVITE_CODE}', '${reqJson.body.USER_TYPE}')`;
    return _query;
};

let user_master = (reqJson) => {
  var _query = `CALL ${_sp_name.USER_MASTER}('${reqJson.body.PARAM_ACTION}','${ reqJson.body.AUTH_TOKEN}','${reqJson.body.USER_ID}')`;
  return _query;
};


module.exports = {
  user_master_save,
    user_master,
};
