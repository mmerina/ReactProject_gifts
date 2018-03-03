var mongoose = require("mongoose");

module.exports = mongoose.model("Admin", {
    "id": String,
    "name": String,
    "password": String,
    "mobile": String,
    "sex": String,
    "email": String,
    "apartment": String,
    "icon":""
});