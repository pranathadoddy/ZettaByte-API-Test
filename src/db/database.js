const mongoose = require("mongoose");
const config = require("../../config/default.js");

exports.connect = function(){
    mongoose.connect(config.mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=> console.log("Database connected")).catch((err)=> console.log(err));
}
