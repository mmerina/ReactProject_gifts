var mongoose = require("mongoose");

module.exports = mongoose.model("File", {
    "filename": String,
    "real": String,
    "ext": String
});