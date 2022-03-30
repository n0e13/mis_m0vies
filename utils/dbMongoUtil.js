const mongoose = require("mongoose");

const DATABASE_URL = "mongodb://localhost:27017/movieApp";
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));

module.exports = mongoose;