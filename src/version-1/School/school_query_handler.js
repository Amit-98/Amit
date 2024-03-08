const _school_queryBuilder = require("./school_query_builder");
const _dbhelper = require("../.././db/db-runner");

let create_school = (reqJson, callback) => {
    let _userQuery = _school_queryBuilder.school_master(reqJson);
    _dbhelper.InsertQuery(_userQuery, callback);
};

let get_schools = (reqJson, callback) => {
    let _userQuery = _school_queryBuilder.school_master(reqJson);
    _dbhelper.Selectquery(_userQuery, callback);
};

let get_auth_token = (reqJson, callback) => {
    let _userQuery = _school_queryBuilder.user_master(reqJson);
    _dbhelper.Selectquery(_userQuery, callback);
};

let create_class = (reqJson, callback) => {
    let _userQuery = _school_queryBuilder.school_master(reqJson);
    _dbhelper.InsertQuery(_userQuery, callback);
};

let get_class = (reqJson, callback) => {
    let _userQuery = _school_queryBuilder.school_master_get(reqJson);
    _dbhelper.Selectquery(_userQuery, callback);
};

let create_student = (reqJson, callback) => {
    let _userQuery = _school_queryBuilder.school_master(reqJson);
    _dbhelper.InsertQuery(_userQuery, callback);
};

let get_students = (reqJson, callback) => {
    let _userQuery = _school_queryBuilder.school_master_get(reqJson);
    _dbhelper.Selectquery(_userQuery, callback);
};

let assign_student = (reqJson, callback) => {
    let _userQuery = _school_queryBuilder.school_master_get(reqJson);
    _dbhelper.InsertQuery(_userQuery, callback);
};

let assign_student_all_class = (reqJson, callback) => {
    let _userQuery = _school_queryBuilder.school_master_get(reqJson);
    _dbhelper.Selectquery(_userQuery, callback);
};

let get_classmates = (reqJson, callback) => {
    let _userQuery = _school_queryBuilder.school_master_get(reqJson);
    _dbhelper.Selectquery(_userQuery, callback);
};

module.exports = {
    create_school,
    get_auth_token,
    create_class,
    get_class,
    create_student,
    get_students,
    assign_student,
    assign_student_all_class,
    get_classmates,
    get_schools
};
