var mongoose = require("mongoose");

module.exports = mongoose.model("User", {
    "id": Number,
    "loginname": String,
    "password": String,
    "name": String,
    "mobile": String,
    "sex": String,
    "email": String,
    "address": String
});