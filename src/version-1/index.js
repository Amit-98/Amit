const app=require("express")()
//const authentiation=require("./authentiation")
//const users=require("./users")
//const _ecomm_customer = require("./Customer");
const _user_master = require("./User_master")
const _school = require("./School")
//app.use('/auth',authentiation)
//app.use('/users',users)
//app.use('/customer_app', _ecomm_customer);
app.use('/user_master', _user_master);
app.use('/school', _school);

module.exports=app