const app=require("express")()

const _booksSummary = require("./BooksSummary");

app.use('/books', _booksSummary);

module.exports=app