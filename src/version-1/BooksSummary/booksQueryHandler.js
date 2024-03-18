const _queryBuilder = require("./booksQueryBuilder");
const _dbhelper = require("../.././db/db-runner");

let addBooks = (reqJson, callback) => {
    let _userQuery = _queryBuilder.addBooks(reqJson);
    _dbhelper.InsertQuery(_userQuery, callback);
};

module.exports = {
    addBooks
}