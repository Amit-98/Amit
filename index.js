const express = require("express")
const app = express()
const route = express.Router()
const compression = require("compression")()
const bodyParser = require('body-parser')
const dbConnection = require("./src/db/db-connect")
const cors = require("cors")()
const src = require("./src")
const helmet = require("helmet");
const Response = require("./src/common/response");
const CommonHandler =require('./src/common')

const port = 3002

global.sql = dbConnection()

app.use(route)
app.use(helmet());
app.use(compression)
app.use(cors);

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

let errorHandler = (err, req, res, next) => {
    if (typeof(err.message[0]) == 'object') 
    {
        res.json(new Response('Fail', 400)
        .setMessage(err.customMsg)
        .setErrorMessage(err.message).build())
        return
    }

    if (err.name == 'ReferenceError') {
        res.json(new Response('Fail', 503)
        .setMessage(CommonHandler.ErrorMsg.internalErrorMsg)
        .setErrorMessage(err.message).build())
        return
    }

    if (err.message === 'Unauthorized_token') {
        // jwt authentication error
        res.json(new Response("Unauthorized", 401)
        .setMessage(CommonHandler.ErrorMsg.InvalidTokenMessage)
        .setErrorMessage(CommonHandler.ErrorMsg.Invalid_Header_Token_Message).build())
        return
    }

    if (err.message === 'INVALID_KEY') {
        res.json(new Response("Invalid", 401)
        .setMessage(CommonHandler.ErrorMsg.InvalidKey)
        .setErrorMessage(CommonHandler.ErrorMsg.InvalidKeyMessage).build())
        return
    }

    if (err.message === 'Unauthorized_auth_token') {
        // jwt authentication error
        res.json(new Response("Unauthorized", 401)
        .setMessage(CommonHandler.ErrorMsg.InvalidTokenMessage)
        .setErrorMessage(CommonHandler.ErrorMsg.InvalidTokenErrorMessage).build())
        return
    }


    if (err.name == 'Error') {
        // custom application error
        res.json(new Response('Fail', 503)
        .setMessage(CommonHandler.ErrorMsg.internalErrorMsg)
        .setErrorMessage(err.message).build())
        return
    }

    if (typeof(err) === 'string') {
        // custom application error
        res.json(new Response(false, 200)
        .setMessage(CommonHandler.ErrorMsg.internalErrorMsg)
        .setErrorMessage(err).build())
        return
    }

    // default to other errors
    res.status(200)
    res.json(new Response("Fail", 400)
    .setMessage(err.customMsg || CommonHandler.ErrorMsg.internalErrorMsg)
    .setErrorMessage(err.message).build())
    
}

let resultHandler = (req, res, next) => {
    console.log("result log");
    res.json(new Response(res.status || "Success", res.code || "200")
        .setMessage(res.message || "OK")
        .setPagination(res.totalRecords,res.page,res.pages)
        .setResultData(res.result).build())
}

app.get("/",function(req, res){
    res.send("Hello World!");
})
app.use("/api",src, resultHandler, errorHandler)
app.listen(port, () => {
    console.log(`Web server listening on: ${port}`);
})
