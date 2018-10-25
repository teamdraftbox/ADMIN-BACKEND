var express = require("express"),
morgan = require("morgan"),
mongoose = require("mongoose"),
router = express.Router(),
User = require("./app/model/user.js"),
bodyParser = require("body-parser"),
api = require("./app/routes/api.js")(router),
manage = require("./app/routes/manageRoutes.js"),
path = require("path"),
app = express()
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,accept-encoding,x-access-token, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });


//===================================config===============================//
app.use(express.static(__dirname + "/public"))
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
mongoose.connect("mongodb://localhost/zeta")
console.log(process.env.DATABASEURL)
//===============================routes==========="======================//
app.use("/api",api)
app.use(manage)

app.listen(8080,function(){
    console.log("connectec to backend server")
})
