var mongoose = require("mongoose");

module.exports = mongoose.model("Flower", {
    "id": Number,
    "name": String,
    "type": String,
    "price": Number,
    "amount": Number,
    "mainflower": String,
    "others": String,
    "package": String,
    "color": String,
    "words": String,
    "volume": Number,
    "friend": Boolean,
    "family": Boolean,
    "lover": Boolean,
    "leader": Boolean,
    "patient": Boolean,
    "romantic": Boolean,
    "birthday": Boolean,
    "friendship": Boolean,
    "apologize": Boolean,
    "kinship": Boolean,
    "avatar": String,
    "collect": Number
});