var mongoose = require("mongoose")
var manageSchema = new mongoose.Schema({
    companyName:String,
    subDomain:String,
    companyImage1:String,
    companyImage2:String,
    bannerText:String,
    email:String,
    detail:String
})

var Manage = mongoose.model("Manage",manageSchema)

module.exports = Manage