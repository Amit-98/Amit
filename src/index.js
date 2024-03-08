const app=require("express")()
const version1=require("./version-1")

app.use('/v1',version1)

module.exports=app