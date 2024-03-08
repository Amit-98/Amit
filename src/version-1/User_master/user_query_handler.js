const _user_queryBuilder = require("./user_query_builder");
const _dbhelper = require("../.././db/db-runner");

let user_signup = (reqJson, callback) => {
  let _userQuery = _user_queryBuilder.user_master_save(reqJson);
  _dbhelper.InsertQuery(_userQuery, callback);
};


let user_login = (reqJson, callback) => {
    let _userQuery = _user_queryBuilder.user_master_save(reqJson);
    _dbhelper.Selectquery(_userQuery, callback);
};

let save_auth_token = (reqJson, callback) => {
  let _userQuery = _user_queryBuilder.user_master(reqJson);
  _dbhelper.InsertQuery(_userQuery, callback);
};

module.exports = {
    user_signup,
    user_login,
    save_auth_token
};
