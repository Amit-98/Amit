const _booksApiParams = require("./booksApiParams");
const _spConstant = _booksApiParams.SP_CONSTANT;

let addBooks = (reqJson) => {
    var _query = `CALL ${_spConstant.ADD_BOOKS_MASTER}('${reqJson.body.PARAM_ACTION}','${reqJson.body.NAME}','${reqJson.body.TITLE}', '${reqJson.body.CONTENT}')`;
    return _query;
};

module.exports = {
    addBooks
}